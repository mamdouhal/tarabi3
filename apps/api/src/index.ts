import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for all routes
app.use('/*', cors());

// Health check endpoint
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    message: 'Tarabi3 API',
    version: '1.0.0',
  });
});

// ============================================
// ADMIN / DATABASE BROWSER ENDPOINTS
// ============================================

// Get all tables with row counts
app.get('/admin/tables', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_cf_%'"
    ).all();
    
    const tables = await Promise.all(
      (results || []).map(async (table: { name: string }) => {
        try {
          const countResult = await c.env.DB.prepare(
            `SELECT COUNT(*) as count FROM "${table.name}"`
          ).first();
          return {
            name: table.name,
            count: (countResult as { count: number })?.count || 0,
          };
        } catch {
          return { name: table.name, count: 0 };
        }
      })
    );
    
    return c.json({ tables });
  } catch (error) {
    return c.json({ 
      tables: [],
      error: 'Failed to fetch tables. Database may not be configured.',
    });
  }
});

// Get table schema
app.get('/admin/tables/:tableName/schema', async (c) => {
  try {
    const tableName = c.req.param('tableName');
    const { results } = await c.env.DB.prepare(
      `PRAGMA table_info("${tableName}")`
    ).all();
    
    const columns = (results || []).map((col: Record<string, unknown>) => ({
      name: col.name,
      type: col.type,
      notnull: col.notnull,
      pk: col.pk,
      defaultValue: col.dflt_value,
    }));
    
    return c.json({ columns });
  } catch (error) {
    return c.json({ columns: [], error: 'Failed to fetch schema' }, 500);
  }
});

// Get table data with pagination
app.get('/admin/tables/:tableName/data', async (c) => {
  try {
    const tableName = c.req.param('tableName');
    const limit = parseInt(c.req.query('limit') || '100');
    const offset = parseInt(c.req.query('offset') || '0');
    
    const startTime = Date.now();
    
    // Get columns first
    const schemaResult = await c.env.DB.prepare(
      `PRAGMA table_info("${tableName}")`
    ).all();
    const columns = (schemaResult.results || []).map((col: Record<string, unknown>) => col.name as string);
    
    // Get data
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM "${tableName}" LIMIT ? OFFSET ?`
    ).bind(limit, offset).all();
    
    // Get total count
    const countResult = await c.env.DB.prepare(
      `SELECT COUNT(*) as count FROM "${tableName}"`
    ).first();
    
    const executionTime = Date.now() - startTime;
    
    return c.json({
      columns,
      rows: results || [],
      rowCount: (countResult as { count: number })?.count || 0,
      executionTime,
    });
  } catch (error) {
    return c.json({ 
      columns: [], 
      rows: [], 
      rowCount: 0, 
      executionTime: 0,
      error: 'Failed to fetch table data',
    }, 500);
  }
});

// Execute custom SQL query (READ ONLY for safety)
app.post('/admin/query', async (c) => {
  try {
    const { query } = await c.req.json();
    
    if (!query || typeof query !== 'string') {
      return c.json({ error: 'Query is required' }, 400);
    }
    
    // Basic SQL injection prevention - only allow SELECT statements
    const trimmedQuery = query.trim().toUpperCase();
    if (!trimmedQuery.startsWith('SELECT') && !trimmedQuery.startsWith('PRAGMA')) {
      return c.json({ 
        error: 'Only SELECT and PRAGMA queries are allowed for safety. Use the Wrangler CLI for data modifications.',
      }, 403);
    }
    
    const startTime = Date.now();
    const { results } = await c.env.DB.prepare(query).all();
    const executionTime = Date.now() - startTime;
    
    // Extract column names from first result
    const columns = results && results.length > 0 
      ? Object.keys(results[0] as object) 
      : [];
    
    return c.json({
      columns,
      rows: results || [],
      rowCount: (results || []).length,
      executionTime,
    });
  } catch (error) {
    return c.json({ 
      error: error instanceof Error ? error.message : 'Query execution failed',
    }, 500);
  }
});

// ============================================
// MAIN API ENDPOINTS
// ============================================

// Get featured projects
app.get('/projects', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM projects WHERE featured = 1 ORDER BY created_at DESC LIMIT 6'
    ).all();
    return c.json({ projects: results });
  } catch (error) {
    // Return empty array if DB not configured or error occurs
    return c.json({ projects: [] });
  }
});

// Get all services
app.get('/services', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM services ORDER BY order_index ASC'
    ).all();
    return c.json({ services: results });
  } catch (error) {
    // Return empty array if DB not configured or error occurs
    return c.json({ services: [] });
  }
});

// Get single project by ID
app.get('/projects/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const result = await c.env.DB.prepare(
      'SELECT * FROM projects WHERE id = ?'
    )
      .bind(id)
      .first();

    if (!result) {
      return c.json({ error: 'Project not found' }, 404);
    }

    return c.json({ project: result });
  } catch (error) {
    return c.json({ error: 'Failed to fetch project' }, 500);
  }
});

// Contact form submission
app.post('/contact', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email format' }, 400);
    }

    // Sanitize inputs by trimming whitespace
    const sanitizedName = String(name).trim().slice(0, 100);
    const sanitizedEmail = String(email).trim().slice(0, 255);
    const sanitizedMessage = String(message).trim().slice(0, 5000);

    if (!sanitizedName || !sanitizedMessage) {
      return c.json({ error: 'Name and message cannot be empty' }, 400);
    }

    // In production, save to DB and/or send email
    // For now, just acknowledge receipt
    return c.json({
      status: 'ok',
      message: 'Contact form submitted successfully',
    });
  } catch (error) {
    return c.json({ error: 'Failed to submit form' }, 500);
  }
});

export default app;
