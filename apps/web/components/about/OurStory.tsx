'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function OurStory() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const milestones = [
    { year: '2020', title: 'The Beginning', description: 'Founded with a vision to transform digital presence for businesses worldwide.' },
    { year: '2021', title: 'Rapid Growth', description: 'Expanded our team and launched our signature 3-pillar approach.' },
    { year: '2022', title: 'Global Reach', description: 'Partnered with clients across 15+ countries, delivering impactful solutions.' },
    { year: '2023', title: 'Innovation Hub', description: 'Launched our AI-powered analytics platform and creative studio.' },
    { year: '2024', title: 'The Future', description: 'Continuing to push boundaries and multiply success for our partners.' },
  ];

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 0',
        backgroundColor: 'var(--tarabi3-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Story intro */}
        <div className="row mb-5">
          <div className="col-12 col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            >
              <p
                style={{
                  fontSize: '0.875rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--tarabi3-accent)',
                  marginBottom: '1rem',
                }}
              >
                Our Story
              </p>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: '1.5rem',
                }}
              >
                Building Digital
                <br />
                <span style={{ color: 'var(--tarabi3-accent)' }}>Excellence</span>
              </h2>
            </motion.div>
          </div>
          <div className="col-12 col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.2 }}
            >
              <p
                style={{
                  fontSize: '1.125rem',
                  color: 'rgba(245, 245, 245, 0.7)',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                }}
              >
                Tarabi3 was born from a simple belief: that every business deserves 
                a digital presence that truly represents their vision and drives 
                measurable results.
              </p>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(245, 245, 245, 0.6)',
                  lineHeight: 1.8,
                }}
              >
                Our name, meaning "Squares" in Arabic, reflects our methodology — 
                building strong, foundational strategies that multiply impact. Just 
                as a square represents stability and growth (x²), we help businesses 
                achieve exponential results.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginTop: '80px', position: 'relative' }}>
          {/* Timeline line */}
          <motion.div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, var(--tarabi3-accent), var(--tarabi3-accent-alt), transparent)',
              transform: 'translateX(-50%)',
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: shouldReduceMotion ? 0 : 1.5 }}
            className="d-none d-lg-block"
          />

          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              className="row mb-5"
              style={{ position: 'relative' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: shouldReduceMotion ? 0 : 0.3 + index * 0.15,
              }}
            >
              {/* Desktop: Alternating layout */}
              <div
                className={`col-12 col-lg-5 ${index % 2 === 0 ? 'text-lg-end' : 'offset-lg-7'}`}
                style={{ order: index % 2 === 0 ? 1 : 2 }}
              >
                <div
                  style={{
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, var(--tarabi3-accent), var(--tarabi3-accent-alt))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {milestone.year}
                  </span>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      color: 'var(--tarabi3-light)',
                    }}
                  >
                    {milestone.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: 'rgba(245, 245, 245, 0.6)',
                      margin: 0,
                    }}
                  >
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Timeline dot - Desktop only */}
              <motion.div
                className="d-none d-lg-flex"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--tarabi3-accent)',
                  border: '3px solid var(--tarabi3-secondary)',
                  zIndex: 2,
                }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
