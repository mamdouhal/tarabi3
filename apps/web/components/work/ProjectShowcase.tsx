'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ProjectShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'Inventory Pro',
      category: 'management',
      description: 'Real-time inventory tracking with AI predictions',
      image: '📦',
      color: '#e94560',
      year: '2024',
    },
    {
      id: 2,
      title: 'CloudCRM',
      category: 'management',
      description: 'Customer relationship platform with analytics',
      image: '👥',
      color: '#e94560',
      year: '2024',
    },
    {
      id: 3,
      title: 'TaskFlow',
      category: 'management',
      description: 'Project management with Kanban boards',
      image: '✅',
      color: '#e94560',
      year: '2023',
    },
    {
      id: 4,
      title: 'ShopElite',
      category: 'web',
      description: 'Premium e-commerce with AR try-on',
      image: '🛍️',
      color: '#533483',
      year: '2024',
    },
    {
      id: 5,
      title: 'TechBlog Pro',
      category: 'web',
      description: 'Modern blog platform with CMS',
      image: '📝',
      color: '#533483',
      year: '2024',
    },
    {
      id: 6,
      title: 'HealthHub',
      category: 'web',
      description: 'Healthcare portal with appointments',
      image: '🏥',
      color: '#533483',
      year: '2023',
    },
    {
      id: 7,
      title: 'ChatGenius',
      category: 'ai',
      description: 'AI customer support chatbot',
      image: '💬',
      color: '#00d9ff',
      year: '2024',
    },
    {
      id: 8,
      title: 'DataVision',
      category: 'ai',
      description: 'Predictive analytics dashboard',
      image: '📈',
      color: '#00d9ff',
      year: '2024',
    },
    {
      id: 9,
      title: 'DocuAI',
      category: 'ai',
      description: 'Document processing & extraction',
      image: '📄',
      color: '#00d9ff',
      year: '2023',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'management', label: 'Management' },
    { id: 'web', label: 'Web Dev' },
    { id: 'ai', label: 'AI Tools' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

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
      {/* Animated background dots */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              left: `${5 + (i % 5) * 23}%`,
              top: `${10 + Math.floor(i / 5) * 25}%`,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

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
            Project Gallery
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              marginBottom: '2rem',
            }}
          >
            More Projects
          </h2>

          {/* Filter buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            {filters.map((f) => (
              <motion.button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  padding: '0.6rem 1.25rem',
                  backgroundColor: filter === f.id
                    ? 'var(--tarabi3-accent)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: 'none',
                  color: filter === f.id
                    ? 'white'
                    : 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  transition: 'all 0.3s ease',
                }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="row g-4"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="col-12 col-md-6 col-lg-4"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : index * 0.1,
              }}
            >
              <motion.div
                style={{
                  position: 'relative',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid',
                  borderColor: hoveredProject === project.id
                    ? project.color
                    : 'rgba(255, 255, 255, 0.05)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={shouldReduceMotion ? {} : { y: -8 }}
              >
                {/* Project image/icon area */}
                <div
                  style={{
                    aspectRatio: '16/10',
                    backgroundColor: `${project.color}10`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Animated background on hover */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(135deg, ${project.color}30, transparent)`,
                      opacity: hoveredProject === project.id ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  />

                  {/* Grid pattern */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `
                        linear-gradient(${project.color}10 1px, transparent 1px),
                        linear-gradient(90deg, ${project.color}10 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px',
                      opacity: 0.5,
                    }}
                  />

                  {/* Icon */}
                  <motion.span
                    style={{
                      fontSize: '4rem',
                      position: 'relative',
                      zIndex: 1,
                    }}
                    animate={
                      hoveredProject === project.id && !shouldReduceMotion
                        ? { scale: 1.2, rotate: [0, -5, 5, 0] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.4 }}
                  >
                    {project.image}
                  </motion.span>

                  {/* Year badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                    }}
                  >
                    {project.year}
                  </span>

                  {/* Category indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '3px',
                      background: project.color,
                      transform: hoveredProject === project.id ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </div>

                {/* Project info */}
                <div style={{ padding: '1.5rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        color: 'var(--tarabi3-light)',
                        margin: 0,
                      }}
                    >
                      {project.title}
                    </h3>
                    <motion.span
                      style={{
                        color: project.color,
                        fontSize: '1.25rem',
                        opacity: hoveredProject === project.id ? 1 : 0,
                        transform: hoveredProject === project.id
                          ? 'translateX(0)'
                          : 'translateX(-10px)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      →
                    </motion.span>
                  </div>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'rgba(245, 245, 245, 0.6)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {project.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
