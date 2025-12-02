'use client';

import { motion, useReducedMotion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

export default function FeaturedWork() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeProject, setActiveProject] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const featuredProjects = [
    {
      id: 1,
      title: 'SmartFlow ERP',
      category: 'Management Systems',
      description: 'A comprehensive enterprise resource planning system for manufacturing companies with real-time analytics, inventory tracking, and automated workflows.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      metrics: [
        { label: 'Efficiency Increase', value: '45%' },
        { label: 'Cost Reduction', value: '30%' },
        { label: 'Users', value: '500+' },
      ],
      color: '#e94560',
      image: '📊',
    },
    {
      id: 2,
      title: 'NexGen Commerce',
      category: 'Web Development',
      description: 'A high-performance e-commerce platform with AI-powered recommendations, real-time inventory sync, and seamless payment integration.',
      tech: ['Next.js', 'TypeScript', 'Stripe', 'Algolia', 'AWS'],
      metrics: [
        { label: 'Conversion Rate', value: '+60%' },
        { label: 'Load Time', value: '<1s' },
        { label: 'Monthly Orders', value: '10K+' },
      ],
      color: '#533483',
      image: '🛒',
    },
    {
      id: 3,
      title: 'AI Analytics Hub',
      category: 'AI Tools',
      description: 'An intelligent business analytics platform using machine learning for predictive insights, anomaly detection, and automated reporting.',
      tech: ['Python', 'TensorFlow', 'FastAPI', 'React', 'GCP'],
      metrics: [
        { label: 'Prediction Accuracy', value: '94%' },
        { label: 'Data Points/Day', value: '1M+' },
        { label: 'Time Saved', value: '70%' },
      ],
      color: '#00d9ff',
      image: '🧠',
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 0',
        backgroundColor: 'var(--tarabi3-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax background element */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 30% 20%, rgba(233, 69, 96, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 70% 80%, rgba(83, 52, 131, 0.08) 0%, transparent 40%)
          `,
          y: shouldReduceMotion ? 0 : backgroundY,
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
            Case Studies
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            Featured Projects
          </h2>
        </motion.div>

        {/* Project selector */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2 }}
        >
          {featuredProjects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={() => setActiveProject(index)}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeProject === index
                  ? `${project.color}20`
                  : 'transparent',
                border: '1px solid',
                borderColor: activeProject === index
                  ? project.color
                  : 'rgba(255, 255, 255, 0.1)',
                color: activeProject === index
                  ? project.color
                  : 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              {project.category}
            </motion.button>
          ))}
        </motion.div>

        {/* Active project display */}
        <motion.div
          key={activeProject}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <div className="row g-4 align-items-center">
            {/* Project visual */}
            <div className="col-12 col-lg-6">
              <motion.div
                style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  backgroundColor: 'var(--tarabi3-secondary)',
                  border: `1px solid ${featuredProjects[activeProject].color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              >
                {/* Background pattern */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                      linear-gradient(45deg, ${featuredProjects[activeProject].color}10 25%, transparent 25%),
                      linear-gradient(-45deg, ${featuredProjects[activeProject].color}10 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, ${featuredProjects[activeProject].color}10 75%),
                      linear-gradient(-45deg, transparent 75%, ${featuredProjects[activeProject].color}10 75%)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                  }}
                />

                {/* Animated circles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: 200 + i * 100,
                      height: 200 + i * 100,
                      borderRadius: '50%',
                      border: `1px solid ${featuredProjects[activeProject].color}${30 - i * 10}`,
                    }}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: [1, 1.1, 1],
                            rotate: [0, 180, 360],
                          }
                    }
                    transition={{
                      duration: 10 + i * 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                ))}

                {/* Icon */}
                <motion.span
                  style={{ fontSize: '8rem', position: 'relative', zIndex: 1 }}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: [0, -10, 0],
                        }
                  }
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {featuredProjects[activeProject].image}
                </motion.span>

                {/* Corner accents */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    width: '40px',
                    height: '40px',
                    borderLeft: `2px solid ${featuredProjects[activeProject].color}`,
                    borderTop: `2px solid ${featuredProjects[activeProject].color}`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    width: '40px',
                    height: '40px',
                    borderRight: `2px solid ${featuredProjects[activeProject].color}`,
                    borderBottom: `2px solid ${featuredProjects[activeProject].color}`,
                  }}
                />
              </motion.div>
            </div>

            {/* Project details */}
            <div className="col-12 col-lg-6">
              <div style={{ paddingLeft: '0', paddingRight: '0' }} className="ps-lg-4">
                <motion.span
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    backgroundColor: `${featuredProjects[activeProject].color}20`,
                    color: featuredProjects[activeProject].color,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '1rem',
                  }}
                >
                  {featuredProjects[activeProject].category}
                </motion.span>

                <h3
                  style={{
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--tarabi3-light)',
                  }}
                >
                  {featuredProjects[activeProject].title}
                </h3>

                <p
                  style={{
                    fontSize: '1.1rem',
                    color: 'rgba(245, 245, 245, 0.7)',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                  }}
                >
                  {featuredProjects[activeProject].description}
                </p>

                {/* Tech stack */}
                <div style={{ marginBottom: '2rem' }}>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'rgba(245, 245, 245, 0.5)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Tech Stack
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {featuredProjects[activeProject].tech.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: '0.4rem 0.8rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: 'var(--tarabi3-light)',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    padding: '1.5rem',
                    backgroundColor: 'var(--tarabi3-secondary)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {featuredProjects[activeProject].metrics.map((metric) => (
                    <div key={metric.label} style={{ textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: featuredProjects[activeProject].color,
                          marginBottom: '0.25rem',
                        }}
                      >
                        {metric.value}
                      </span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'rgba(245, 245, 245, 0.5)',
                        }}
                      >
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
