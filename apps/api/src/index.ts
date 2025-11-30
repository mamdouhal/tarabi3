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
