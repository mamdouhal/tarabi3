'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function WorkCategories() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const categories = [
    {
      id: 1,
      icon: '⚙️',
      title: 'Management Systems',
      subtitle: 'Enterprise Solutions',
      description: 'Custom ERP, CRM, and workflow automation systems that streamline operations and boost productivity.',
      stats: { projects: 18, clients: 12 },
      features: ['ERP Systems', 'CRM Platforms', 'Inventory Management', 'HR Solutions'],
      color: '#e94560',
      gradient: 'linear-gradient(135deg, #e94560, #ff6b8a)',
    },
    {
      id: 2,
      icon: '🌐',
      title: 'Web Development',
      subtitle: 'Digital Experiences',
      description: 'High-performance websites and web applications with stunning designs and seamless user experiences.',
      stats: { projects: 25, clients: 20 },
      features: ['E-Commerce', 'Web Apps', 'Landing Pages', 'Portals'],
      color: '#533483',
      gradient: 'linear-gradient(135deg, #533483, #7b52ab)',
    },
    {
      id: 3,
      icon: '🤖',
      title: 'AI Tools',
      subtitle: 'Intelligent Solutions',
      description: 'Cutting-edge AI-powered tools for automation, analytics, and intelligent decision-making.',
      stats: { projects: 12, clients: 8 },
      features: ['Chatbots', 'Data Analytics', 'Automation', 'ML Models'],
      color: '#00d9ff',
      gradient: 'linear-gradient(135deg, #00d9ff, #00b4d8)',
    },
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
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
            What We Build
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            Our Expertise Areas
          </h2>
        </motion.div>

        <div className="row g-4">
          {categories.map((category, index) => (
            <div key={category.id} className="col-12 col-lg-4">
              <motion.div
                style={{
                  height: '100%',
                  padding: '2.5rem',
                  backgroundColor: hoveredCategory === index
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid',
                  borderColor: hoveredCategory === index
                    ? category.color
                    : 'rgba(255, 255, 255, 0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  delay: shouldReduceMotion ? 0 : index * 0.2,
                }}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                whileHover={shouldReduceMotion ? {} : { y: -10 }}
              >
                {/* Glow effect */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: `radial-gradient(circle, ${category.color}20 0%, transparent 50%)`,
                    opacity: hoveredCategory === index ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }}
                />

                {/* Top gradient line */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: category.gradient,
                    transformOrigin: 'left',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.8,
                    delay: shouldReduceMotion ? 0 : 0.5 + index * 0.2,
                  }}
                />

                {/* Icon */}
                <motion.div
                  style={{
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    background: `${category.color}15`,
                    border: `1px solid ${category.color}30`,
                    marginBottom: '1.5rem',
                    position: 'relative',
                  }}
                  animate={
                    hoveredCategory === index && !shouldReduceMotion
                      ? { rotate: [0, -5, 5, 0] }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  {category.icon}
                  
                  {/* Corner accent */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -1,
                      right: -1,
                      width: '20px',
                      height: '20px',
                      borderRight: `2px solid ${category.color}`,
                      borderBottom: `2px solid ${category.color}`,
                    }}
                  />
                </motion.div>

                {/* Content */}
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: category.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginBottom: '0.5rem',
                  }}
                >
                  {category.subtitle}
                </p>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--tarabi3-light)',
                  }}
                >
                  {category.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'rgba(245, 245, 245, 0.6)',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                  }}
                >
                  {category.description}
                </p>

                {/* Features tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  {category.features.map((feature) => (
                    <span
                      key={feature}
                      style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.75rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'rgba(245, 245, 245, 0.7)',
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div
                  style={{
                    display: 'flex',
                    gap: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: category.color,
                      }}
                    >
                      {category.stats.projects}+
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(245, 245, 245, 0.5)' }}>
                      Projects
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: category.color,
                      }}
                    >
                      {category.stats.clients}+
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(245, 245, 245, 0.5)' }}>
                      Clients
                    </span>
                  </div>
                </div>

                {/* Arrow indicator */}
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: '2.5rem',
                    right: '2.5rem',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${category.color}50`,
                    color: category.color,
                    fontSize: '1.25rem',
                    opacity: hoveredCategory === index ? 1 : 0,
                    transform: hoveredCategory === index ? 'translateX(0)' : 'translateX(-10px)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  →
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
