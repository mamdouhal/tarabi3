'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DatabaseBrowser from '@/components/admin/DatabaseBrowser';
import MessagesPanel from '@/components/admin/MessagesPanel';

export default function AdminPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activePanel, setActivePanel] = useState<'messages' | 'database'>('messages');

  const panels = [
    { id: 'messages', label: 'Messages', icon: '💬', description: 'Contact form submissions' },
    { id: 'database', label: 'Database', icon: '🗄️', description: 'Browse & query database' },
  ] as const;

  return (
    <main>
      <Navbar />
      
      {/* Admin Navigation */}
      <section
        style={{
          backgroundColor: 'var(--tarabi3-secondary)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '100px',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
            {panels.map((panel) => (
              <motion.button
                key={panel.id}
                onClick={() => setActivePanel(panel.id)}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: activePanel === panel.id
                    ? 'rgba(233, 69, 96, 0.15)'
                    : 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid',
                  borderColor: activePanel === panel.id
                    ? 'var(--tarabi3-accent)'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: activePanel === panel.id
                    ? 'var(--tarabi3-accent)'
                    : 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease',
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        borderColor: 'var(--tarabi3-accent)',
                        backgroundColor: 'rgba(233, 69, 96, 0.1)',
                      }
                }
              >
                <span style={{ fontSize: '1.25rem' }}>{panel.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ display: 'block', fontWeight: 600, fontSize: '0.95rem' }}>
                    {panel.label}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      opacity: 0.7,
                    }}
                  >
                    {panel.description}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Panel Content */}
      {activePanel === 'messages' && <MessagesPanel />}
      {activePanel === 'database' && <DatabaseBrowser />}

      <Footer />
    </main>
  );
}
