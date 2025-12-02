'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function StatsSection() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: '150+', label: 'Projects Delivered', icon: '🚀' },
    { value: '50+', label: 'Happy Clients', icon: '🤝' },
    { value: '15+', label: 'Countries Reached', icon: '🌍' },
    { value: '98%', label: 'Client Satisfaction', icon: '⭐' },
  ];

  return (
    <section
      ref={ref}
      style={{
        padding: '100px 0',
        backgroundColor: 'var(--tarabi3-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient orbs */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--tarabi3-accent) 0%, transparent 70%)',
          opacity: 0.05,
          filter: 'blur(100px)',
          top: '-200px',
          left: '-100px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--tarabi3-accent-alt) 0%, transparent 70%)',
          opacity: 0.05,
          filter: 'blur(100px)',
          bottom: '-150px',
          right: '-50px',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row g-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="col-6 col-lg-3">
              <motion.div
                style={{
                  textAlign: 'center',
                  padding: '2rem 1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -5,
                        boxShadow: '0 10px 40px rgba(233, 69, 96, 0.1)',
                      }
                }
              >
                {/* Glow effect on hover */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.1), rgba(83, 52, 131, 0.1))',
                    opacity: 0,
                  }}
                  whileHover={shouldReduceMotion ? {} : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>
                  {stat.icon}
                </span>
                <motion.span
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, var(--tarabi3-accent), var(--tarabi3-accent-alt))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  {stat.value}
                </motion.span>
                <span
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(245, 245, 245, 0.7)',
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
