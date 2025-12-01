'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef } from 'react';

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into understanding your business, goals, audience, and challenges through comprehensive research and stakeholder interviews.',
    duration: '1-2 Weeks',
    deliverables: ['Market Analysis', 'User Research', 'Competitive Audit', 'Strategy Brief'],
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Based on our findings, we develop a tailored strategy that aligns with your objectives and sets clear metrics for success.',
    duration: '1-2 Weeks',
    deliverables: ['Project Roadmap', 'Technical Specs', 'Creative Direction', 'Timeline & Budget'],
  },
  {
    number: '03',
    title: 'Design & Build',
    description: 'Our team brings the strategy to life with iterative design sprints and agile development practices.',
    duration: '4-12 Weeks',
    deliverables: ['UI/UX Designs', 'Development Sprints', 'Quality Assurance', 'Staging Environment'],
  },
  {
    number: '04',
    title: 'Launch',
    description: 'We ensure a smooth deployment with thorough testing, performance optimization, and a strategic launch plan.',
    duration: '1-2 Weeks',
    deliverables: ['Deployment', 'Performance Testing', 'Launch Campaign', 'Team Training'],
  },
  {
    number: '05',
    title: 'Grow',
    description: 'Post-launch, we continue to optimize, iterate, and scale based on real user data and evolving business needs.',
    duration: 'Ongoing',
    deliverables: ['Analytics Review', 'A/B Testing', 'Feature Updates', 'Growth Strategy'],
  },
];

export default function ProcessTimeline() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: 'var(--tarabi3-primary)',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          left: '-10%',
          top: '20%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(233, 69, 96, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '-10%',
          bottom: '20%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(83, 52, 131, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12 col-lg-8">
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
                Our Process
              </p>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 800,
                  marginBottom: '1rem',
                  color: 'var(--tarabi3-light)',
                }}
              >
                How We Work
              </h2>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'rgba(245, 245, 245, 0.7)',
                  maxWidth: '600px',
                }}
              >
                A proven methodology that ensures every project is delivered on time, 
                on budget, and exceeds expectations.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <motion.div
            style={{
              position: 'absolute',
              left: '24px',
              top: 0,
              width: '2px',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transformOrigin: 'top',
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: shouldReduceMotion ? 0 : 1, ease: 'easeOut' }}
          />

          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.15,
              }}
              style={{
                position: 'relative',
                paddingLeft: '80px',
                paddingBottom: index === processSteps.length - 1 ? 0 : '4rem',
              }}
            >
              {/* Step number circle */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '50px',
                  height: '50px',
                  backgroundColor: index % 2 === 0 ? 'var(--tarabi3-accent)' : 'var(--tarabi3-accent-alt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                {step.number}
              </div>

              {/* Content card */}
              <div
                style={{
                  backgroundColor: 'rgba(26, 26, 46, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '2rem',
                }}
              >
                <div className="row">
                  <div className="col-12 col-md-8">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: 'var(--tarabi3-light)',
                          margin: 0,
                        }}
                      >
                        {step.title}
                      </h3>
                      <span
                        style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: 'rgba(233, 69, 96, 0.1)',
                          color: 'var(--tarabi3-accent)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {step.duration}
                      </span>
                    </div>
                    <p
                      style={{
                        color: 'rgba(245, 245, 245, 0.7)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                  <div className="col-12 col-md-4 mt-3 mt-md-0">
                    <p
                      style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'rgba(245, 245, 245, 0.5)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Deliverables
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {step.deliverables.map((item) => (
                        <span
                          key={item}
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: 'rgba(245, 245, 245, 0.8)',
                            fontSize: '0.75rem',
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
