'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string | null;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

const API_BASE_URL = 'https://tarabi3-api.mamdouh200464.workers.dev';

export default function MessagesPanel() {
  const shouldReduceMotion = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [copiedPhone, setCopiedPhone] = useState<number | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/messages`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load messages');
      // Demo data for development
      setMessages([
        {
          id: 1,
          name: 'Ahmed Ali',
          email: 'ahmed@example.com',
          phone: '+971501234567',
          company: 'Tech Corp',
          service: 'Web Development',
          message: 'We need a new website for our company. Looking for modern design with good performance.',
          status: 'new',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'Sara Mohammed',
          email: 'sara@example.com',
          phone: '+971509876543',
          company: 'Fashion Brand',
          service: 'Digital Marketing',
          message: 'Interested in your social media marketing services for our fashion brand.',
          status: 'read',
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id: number, status: 'new' | 'read' | 'replied') => {
    try {
      await fetch(`${API_BASE_URL}/admin/messages/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (err) {
      // Update locally even if API fails
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    }
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(id);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const openWhatsApp = (phone: string) => {
    // Remove any non-digit characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    window.open(`https://wa.me/${cleanPhone.replace('+', '')}`, '_blank');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const filteredMessages = messages.filter(m => filter === 'all' || m.status === filter);

  const statusColors = {
    new: { bg: 'rgba(25, 135, 84, 0.2)', border: 'rgba(25, 135, 84, 0.5)', text: '#4ade80' },
    read: { bg: 'rgba(13, 110, 253, 0.2)', border: 'rgba(13, 110, 253, 0.5)', text: '#60a5fa' },
    replied: { bg: 'rgba(108, 117, 125, 0.2)', border: 'rgba(108, 117, 125, 0.5)', text: '#9ca3af' },
  };

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
          className="mb-4"
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
              Messages
            </h1>
            <span
              style={{
                backgroundColor: 'var(--tarabi3-accent)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              {messages.filter(m => m.status === 'new').length} New
            </span>
          </div>
          <p style={{ color: 'rgba(245, 245, 245, 0.6)', marginLeft: '28px' }}>
            Contact form submissions from your website
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          {(['all', 'new', 'read', 'replied'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: filter === f ? 'var(--tarabi3-accent)' : 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                color: filter === f ? 'white' : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '0.875rem',
                textTransform: 'capitalize',
              }}
            >
              {f} {f !== 'all' && `(${messages.filter(m => m.status === f).length})`}
            </button>
          ))}
          <button
            onClick={fetchMessages}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            ↻ Refresh
          </button>
        </motion.div>

        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            border: '1px solid rgba(220, 53, 69, 0.3)',
            color: '#ff6b6b',
            marginBottom: '1rem',
            fontSize: '0.9rem',
          }}>
            ⚠️ {error} (showing demo data)
          </div>
        )}

        <div className="row g-4">
          {/* Messages List */}
          <div className="col-12 col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2 }}
              style={{
                backgroundColor: 'var(--tarabi3-secondary)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                maxHeight: 'calc(100vh - 300px)',
                overflowY: 'auto',
              }}
            >
              {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                  Loading messages...
                </div>
              ) : filteredMessages.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📭</span>
                  No messages found
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (message.status === 'new') {
                        updateMessageStatus(message.id, 'read');
                      }
                    }}
                    style={{
                      padding: '1.25rem',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      cursor: 'pointer',
                      backgroundColor: selectedMessage?.id === message.id
                        ? 'rgba(233, 69, 96, 0.1)'
                        : message.status === 'new'
                        ? 'rgba(25, 135, 84, 0.05)'
                        : 'transparent',
                      borderLeft: selectedMessage?.id === message.id
                        ? '3px solid var(--tarabi3-accent)'
                        : '3px solid transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--tarabi3-accent), var(--tarabi3-accent-alt))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1rem',
                          }}
                        >
                          {message.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 style={{ color: 'var(--tarabi3-light)', fontWeight: 600, margin: 0, fontSize: '0.95rem' }}>
                            {message.name}
                          </h4>
                          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: 0 }}>
                            {message.company || message.email}
                          </p>
                        </div>
                      </div>
                      <span
                        style={{
                          padding: '0.2rem 0.5rem',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          backgroundColor: statusColors[message.status].bg,
                          border: `1px solid ${statusColors[message.status].border}`,
                          color: statusColors[message.status].text,
                        }}
                      >
                        {message.status}
                      </span>
                    </div>
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '0.875rem',
                        margin: '0.5rem 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {message.message}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
                        {formatDate(message.created_at)}
                      </span>
                      {message.service && (
                        <span
                          style={{
                            padding: '0.2rem 0.5rem',
                            fontSize: '0.7rem',
                            backgroundColor: 'rgba(83, 52, 131, 0.2)',
                            color: 'var(--tarabi3-accent-alt)',
                            border: '1px solid rgba(83, 52, 131, 0.3)',
                          }}
                        >
                          {message.service}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </div>

          {/* Message Detail */}
          <div className="col-12 col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.3 }}
              style={{
                backgroundColor: 'var(--tarabi3-secondary)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                minHeight: '400px',
              }}
            >
              {!selectedMessage ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                  <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>💬</span>
                  <p>Select a message to view details</p>
                </div>
              ) : (
                <div style={{ padding: '2rem' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--tarabi3-accent), var(--tarabi3-accent-alt))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '1.5rem',
                        }}
                      >
                        {selectedMessage.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 style={{ color: 'var(--tarabi3-light)', fontWeight: 700, margin: 0, fontSize: '1.5rem' }}>
                          {selectedMessage.name}
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                          {selectedMessage.company || 'No company'}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {(['new', 'read', 'replied'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateMessageStatus(selectedMessage.id, s)}
                          style={{
                            padding: '0.4rem 0.8rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            backgroundColor: selectedMessage.status === s
                              ? statusColors[s].bg
                              : 'transparent',
                            border: `1px solid ${statusColors[s].border}`,
                            color: statusColors[s].text,
                            cursor: 'pointer',
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1rem',
                      marginBottom: '2rem',
                      padding: '1.5rem',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                    }}
                  >
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: '0 0 0.25rem', textTransform: 'uppercase' }}>
                        Email
                      </p>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        style={{ color: 'var(--tarabi3-accent)', textDecoration: 'none' }}
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: '0 0 0.25rem', textTransform: 'uppercase' }}>
                        Phone / WhatsApp
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--tarabi3-light)' }}>{selectedMessage.phone}</span>
                        <button
                          onClick={() => copyToClipboard(selectedMessage.phone, selectedMessage.id)}
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: copiedPhone === selectedMessage.id ? 'rgba(25, 135, 84, 0.3)' : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: copiedPhone === selectedMessage.id ? '#4ade80' : 'rgba(255,255,255,0.7)',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                          }}
                          title="Copy phone number"
                        >
                          {copiedPhone === selectedMessage.id ? '✓ Copied!' : '📋 Copy'}
                        </button>
                        <button
                          onClick={() => openWhatsApp(selectedMessage.phone)}
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: 'rgba(37, 211, 102, 0.2)',
                            border: '1px solid rgba(37, 211, 102, 0.4)',
                            color: '#25D366',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                          }}
                          title="Open in WhatsApp"
                        >
                          💬 WhatsApp
                        </button>
                      </div>
                    </div>
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: '0 0 0.25rem', textTransform: 'uppercase' }}>
                        Service
                      </p>
                      <span style={{ color: 'var(--tarabi3-light)' }}>{selectedMessage.service || 'Not specified'}</span>
                    </div>
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: '0 0 0.25rem', textTransform: 'uppercase' }}>
                        Received
                      </p>
                      <span style={{ color: 'var(--tarabi3-light)' }}>{formatDate(selectedMessage.created_at)}</span>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <h3 style={{ color: 'var(--tarabi3-light)', fontWeight: 600, marginBottom: '1rem', fontSize: '1rem' }}>
                      Message
                    </h3>
                    <div
                      style={{
                        padding: '1.5rem',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderLeft: '3px solid var(--tarabi3-accent)',
                        color: 'rgba(255,255,255,0.8)',
                        lineHeight: 1.7,
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {selectedMessage.message}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => openWhatsApp(selectedMessage.phone)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #25D366, #128C7E)',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      💬 Reply on WhatsApp
                    </button>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'var(--tarabi3-light)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                      }}
                    >
                      📧 Send Email
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
