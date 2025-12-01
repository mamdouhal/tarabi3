'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef } from 'react';

const techCategories = [
  {
    title: 'Frontend',
    techs: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '▲' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Tailwind', icon: '🎨' },
    ],
  },
  {
    title: 'Backend',
    techs: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Python', icon: '🐍' },
      { name: 'Hono', icon: '🔥' },
      { name: 'GraphQL', icon: '◈' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    techs: [
      { name: 'Cloudflare', icon: '☁️' },
      { name: 'AWS', icon: '🌐' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Vercel', icon: '▲' },
    ],
  },
  {
    title: 'Databases',
    techs: [
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Redis', icon: '🔴' },
      { name: 'D1', icon: '💾' },
    ],
  },
];

const marketingTools = [
  'Google Analytics', 'Meta Ads', 'HubSpot', 'Mailchimp',
  'Hootsuite', 'SEMrush', 'Ahrefs', 'Figma',
];

export default function TechStack() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: 'var(--tarabi3-secondary)',
        padding: '8rem 0',
        position: 'relative',
      }}
    >
      {/* Animated background squares */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: 10 + (i % 5) * 10,
              height: 10 + (i % 5) * 10,
              border: '1px solid rgba(255, 255, 255, 0.03)',
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -20, 0],
                    rotate: [0, 45, 0],
                  }
            }
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            >
              <p
                style={{
                  fontSize: '0.875rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--tarabi3-accent)',
                  marginBottom: '1rem',
                }}
              >
                Technology
              </p>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 800,
                  marginBottom: '1rem',
                  color: 'var(--tarabi3-light)',
                }}
              >
                Our Tech Stack
              </h2>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'rgba(245, 245, 245, 0.7)',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                We use cutting-edge technologies to build fast, scalable, and maintainable solutions.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Tech Grid */}
        <div className="row g-4 mb-5">
          {techCategories.map((category, categoryIndex) => (
            <div key={category.title} className="col-6 col-lg-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: shouldReduceMotion ? 0 : categoryIndex * 0.1,
                }}
                style={{
                  backgroundColor: 'rgba(10, 10, 10, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '1.5rem',
                  height: '100%',
                }}
              >
                <h3
                  style={{
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--tarabi3-accent)',
                    marginBottom: '1.5rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {category.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {category.techs.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.3,
                        delay: shouldReduceMotion ? 0 : categoryIndex * 0.1 + techIndex * 0.05,
                      }}
                    >
                      <span style={{ fontSize: '1.25rem' }}>{tech.icon}</span>
                      <span
                        style={{
                          color: 'var(--tarabi3-light)',
                          fontSize: '0.9rem',
                        }}
                      >
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Marketing Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.4,
            delay: shouldReduceMotion ? 0 : 0.5,
          }}
          style={{
            backgroundColor: 'rgba(10, 10, 10, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--tarabi3-accent-alt)',
              marginBottom: '1.5rem',
            }}
          >
            Marketing & Design Tools
          </h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            {marketingTools.map((tool) => (
              <span
                key={tool}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(83, 52, 131, 0.2)',
                  border: '1px solid rgba(83, 52, 131, 0.3)',
                  color: 'var(--tarabi3-light)',
                  fontSize: '0.875rem',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
