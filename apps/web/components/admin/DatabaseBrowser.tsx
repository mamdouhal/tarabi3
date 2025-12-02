'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TableInfo {
  name: string;
  count: number;
}

interface ColumnInfo {
  name: string;
  type: string;
  notnull: number;
  pk: number;
}

interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  executionTime: number;
}

const API_BASE_URL = 'https://tarabi3-api.mamdouh200464.workers.dev';

export default function DatabaseBrowser() {
  const shouldReduceMotion = useReducedMotion();
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableData, setTableData] = useState<QueryResult | null>(null);
  const [tableSchema, setTableSchema] = useState<ColumnInfo[]>([]);
  const [customQuery, setCustomQuery] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'browse' | 'query' | 'schema'>('browse');

  // Fetch tables list
  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/tables`);
      if (!response.ok) throw new Error('Failed to fetch tables');
      const data = await response.json();
      setTables(data.tables || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to database');
      // Set demo data for development
      setTables([
        { name: 'projects', count: 0 },
        { name: 'services', count: 0 },
        { name: 'contacts', count: 0 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTableData = async (tableName: string) => {
    setLoading(true);
    setError(null);
    setSelectedTable(tableName);
    try {
      const [dataRes, schemaRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/tables/${tableName}/data`),
        fetch(`${API_BASE_URL}/admin/tables/${tableName}/schema`),
      ]);
      
      if (!dataRes.ok || !schemaRes.ok) throw new Error('Failed to fetch table data');
      
      const data = await dataRes.json();
      const schema = await schemaRes.json();
      
      setTableData(data);
      setTableSchema(schema.columns || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch table data');
      // Demo schema for development
      setTableSchema([
        { name: 'id', type: 'INTEGER', notnull: 1, pk: 1 },
        { name: 'name', type: 'TEXT', notnull: 1, pk: 0 },
        { name: 'created_at', type: 'DATETIME', notnull: 0, pk: 0 },
      ]);
      setTableData({ columns: ['id', 'name', 'created_at'], rows: [], rowCount: 0, executionTime: 0 });
    } finally {
      setLoading(false);
    }
  };

  const executeQuery = async () => {
    if (!customQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: customQuery }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Query execution failed');
      }
      
      const data = await response.json();
      setQueryResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query execution failed');
    } finally {
      setLoading(false);
    }
  };

  const quickQueries = [
    { label: 'Show all tables', query: "SELECT name FROM sqlite_master WHERE type='table'" },
    { label: 'Count all projects', query: 'SELECT COUNT(*) as count FROM projects' },
    { label: 'Recent contacts', query: 'SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10' },
    { label: 'Featured projects', query: 'SELECT * FROM projects WHERE featured = 1' },
  ];

  return (
    <section
      style={{
        backgroundColor: 'var(--tarabi3-primary)',
        minHeight: '100vh',
        paddingTop: '120px',
        paddingBottom: '4rem',
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="mb-5"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: 'var(--tarabi3-accent)',
              }}
            />
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--tarabi3-light)',
                margin: 0,
              }}
            >
              Database Browser
            </h1>
          </div>
          <p style={{ color: 'rgba(245, 245, 245, 0.6)', marginLeft: '28px' }}>
            Browse, query, and manage your D1 database
          </p>
        </motion.div>

        <div className="row g-4">
          {/* Sidebar - Tables List */}
          <div className="col-12 col-md-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.1 }}
              style={{
                backgroundColor: 'var(--tarabi3-secondary)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--tarabi3-accent)', margin: 0 }}>
                  TABLES
                </h3>
                <button
                  onClick={fetchTables}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                  title="Refresh"
                >
                  ↻
                </button>
              </div>

              {loading && !tables.length ? (
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>Loading...</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {tables.map((table) => (
                    <button
                      key={table.name}
                      onClick={() => fetchTableData(table.name)}
                      style={{
                        padding: '0.75rem 1rem',
                        backgroundColor: selectedTable === table.name 
                          ? 'rgba(233, 69, 96, 0.2)' 
                          : 'rgba(255, 255, 255, 0.03)',
                        border: selectedTable === table.name 
                          ? '1px solid var(--tarabi3-accent)' 
                          : '1px solid rgba(255, 255, 255, 0.05)',
                        color: selectedTable === table.name 
                          ? 'var(--tarabi3-accent)' 
                          : 'var(--tarabi3-light)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>📋 {table.name}</span>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        opacity: 0.6,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '2px',
                      }}>
                        {table.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Database Stats */}
              <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>
                  DATABASE INFO
                </h4>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
                  <p style={{ margin: '0.25rem 0' }}>Type: Cloudflare D1</p>
                  <p style={{ margin: '0.25rem 0' }}>Tables: {tables.length}</p>
                  <p style={{ margin: '0.25rem 0' }}>Engine: SQLite</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-9">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2 }}
              style={{
                backgroundColor: 'var(--tarabi3-secondary)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Tabs */}
              <div style={{ 
                display: 'flex', 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}>
                {(['browse', 'query', 'schema'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '1rem 1.5rem',
                      backgroundColor: activeTab === tab ? 'rgba(233, 69, 96, 0.1)' : 'transparent',
                      border: 'none',
                      borderBottom: activeTab === tab ? '2px solid var(--tarabi3-accent)' : '2px solid transparent',
                      color: activeTab === tab ? 'var(--tarabi3-accent)' : 'rgba(255,255,255,0.6)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      textTransform: 'capitalize',
                    }}
                  >
                    {tab === 'browse' && '📊 '}
                    {tab === 'query' && '⚡ '}
                    {tab === 'schema' && '🔧 '}
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ padding: '1.5rem' }}>
                {/* Error Display */}
                {error && (
                  <div style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    border: '1px solid rgba(220, 53, 69, 0.3)',
                    color: '#ff6b6b',
                    marginBottom: '1rem',
                    fontSize: '0.9rem',
                  }}>
                    ⚠️ {error}
                  </div>
                )}

                {/* Browse Tab */}
                {activeTab === 'browse' && (
                  <div>
                    {!selectedTable ? (
                      <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.5)' }}>
                        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</p>
                        <p>Select a table from the sidebar to browse data</p>
                      </div>
                    ) : (
                      <>
                        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h3 style={{ color: 'var(--tarabi3-light)', margin: 0 }}>
                            {selectedTable}
                            <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginLeft: '0.5rem' }}>
                              ({tableData?.rowCount || 0} rows)
                            </span>
                          </h3>
                          <button
                            onClick={() => fetchTableData(selectedTable)}
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: 'var(--tarabi3-accent)',
                              border: 'none',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                            }}
                          >
                            Refresh
                          </button>
                        </div>

                        {loading ? (
                          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading data...</p>
                        ) : (
                          <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <thead>
                                <tr>
                                  {tableData?.columns.map((col) => (
                                    <th
                                      key={col}
                                      style={{
                                        padding: '0.75rem',
                                        textAlign: 'left',
                                        backgroundColor: 'rgba(0,0,0,0.3)',
                                        color: 'var(--tarabi3-accent)',
                                        fontWeight: 600,
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase',
                                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                                      }}
                                    >
                                      {col}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {tableData?.rows.length === 0 ? (
                                  <tr>
                                    <td 
                                      colSpan={tableData?.columns.length || 1}
                                      style={{ 
                                        padding: '2rem', 
                                        textAlign: 'center', 
                                        color: 'rgba(255,255,255,0.5)' 
                                      }}
                                    >
                                      No data found in this table
                                    </td>
                                  </tr>
                                ) : (
                                  tableData?.rows.map((row, i) => (
                                    <tr key={i}>
                                      {tableData.columns.map((col) => (
                                        <td
                                          key={col}
                                          style={{
                                            padding: '0.75rem',
                                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                                            color: 'var(--tarabi3-light)',
                                            fontSize: '0.875rem',
                                          }}
                                        >
                                          {row[col] === null ? (
                                            <span style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>NULL</span>
                                          ) : (
                                            String(row[col])
                                          )}
                                        </td>
                                      ))}
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* Query Tab */}
                {activeTab === 'query' && (
                  <div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                        SQL Query
                      </label>
                      <textarea
                        value={customQuery}
                        onChange={(e) => setCustomQuery(e.target.value)}
                        placeholder="SELECT * FROM projects WHERE featured = 1"
                        style={{
                          width: '100%',
                          minHeight: '120px',
                          padding: '1rem',
                          backgroundColor: 'rgba(0,0,0,0.3)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'var(--tarabi3-light)',
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={executeQuery}
                        disabled={loading || !customQuery.trim()}
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: loading ? 'rgba(233, 69, 96, 0.5)' : 'var(--tarabi3-accent)',
                          border: 'none',
                          color: 'white',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        {loading ? '⏳ Executing...' : '▶️ Execute Query'}
                      </button>
                      <button
                        onClick={() => { setCustomQuery(''); setQueryResult(null); }}
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: 'rgba(255,255,255,0.7)',
                          cursor: 'pointer',
                        }}
                      >
                        Clear
                      </button>
                    </div>

                    {/* Quick Queries */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>
                        QUICK QUERIES
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {quickQueries.map((q) => (
                          <button
                            key={q.label}
                            onClick={() => setCustomQuery(q.query)}
                            style={{
                              padding: '0.4rem 0.8rem',
                              backgroundColor: 'rgba(83, 52, 131, 0.2)',
                              border: '1px solid rgba(83, 52, 131, 0.4)',
                              color: 'var(--tarabi3-light)',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                            }}
                          >
                            {q.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Query Results */}
                    {queryResult && (
                      <div>
                        <div style={{ 
                          marginBottom: '0.5rem', 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          color: 'rgba(255,255,255,0.6)',
                          fontSize: '0.8rem',
                        }}>
                          <span>{queryResult.rowCount} rows returned</span>
                          <span>{queryResult.executionTime}ms</span>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                              <tr>
                                {queryResult.columns.map((col) => (
                                  <th
                                    key={col}
                                    style={{
                                      padding: '0.75rem',
                                      textAlign: 'left',
                                      backgroundColor: 'rgba(83, 52, 131, 0.3)',
                                      color: 'var(--tarabi3-light)',
                                      fontWeight: 600,
                                      fontSize: '0.8rem',
                                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                                    }}
                                  >
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {queryResult.rows.map((row, i) => (
                                <tr key={i}>
                                  {queryResult.columns.map((col) => (
                                    <td
                                      key={col}
                                      style={{
                                        padding: '0.75rem',
                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                        color: 'var(--tarabi3-light)',
                                        fontSize: '0.875rem',
                                      }}
                                    >
                                      {row[col] === null ? (
                                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>NULL</span>
                                      ) : (
                                        String(row[col])
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Schema Tab */}
                {activeTab === 'schema' && (
                  <div>
                    {!selectedTable ? (
                      <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.5)' }}>
                        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔧</p>
                        <p>Select a table to view its schema</p>
                      </div>
                    ) : (
                      <>
                        <h3 style={{ color: 'var(--tarabi3-light)', marginBottom: '1rem' }}>
                          Schema: {selectedTable}
                        </h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr>
                              {['Column', 'Type', 'Not Null', 'Primary Key'].map((header) => (
                                <th
                                  key={header}
                                  style={{
                                    padding: '0.75rem',
                                    textAlign: 'left',
                                    backgroundColor: 'rgba(0,0,0,0.3)',
                                    color: 'var(--tarabi3-accent)',
                                    fontWeight: 600,
                                    fontSize: '0.8rem',
                                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                                  }}
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {tableSchema.map((col) => (
                              <tr key={col.name}>
                                <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--tarabi3-light)' }}>
                                  {col.name}
                                </td>
                                <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--tarabi3-accent-alt)' }}>
                                  {col.type}
                                </td>
                                <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--tarabi3-light)' }}>
                                  {col.notnull ? '✅ Yes' : '❌ No'}
                                </td>
                                <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--tarabi3-light)' }}>
                                  {col.pk ? '🔑 Yes' : '—'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Create Table SQL */}
                        <div style={{ marginTop: '2rem' }}>
                          <h4 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                            CREATE TABLE Statement
                          </h4>
                          <pre
                            style={{
                              padding: '1rem',
                              backgroundColor: 'rgba(0,0,0,0.3)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: 'var(--tarabi3-light)',
                              fontSize: '0.8rem',
                              overflow: 'auto',
                              fontFamily: 'monospace',
                            }}
                          >
{`CREATE TABLE ${selectedTable} (
${tableSchema.map(col => `  ${col.name} ${col.type}${col.pk ? ' PRIMARY KEY' : ''}${col.notnull ? ' NOT NULL' : ''}`).join(',\n')}
);`}
                          </pre>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
