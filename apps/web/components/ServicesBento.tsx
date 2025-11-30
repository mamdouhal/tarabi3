'use client';

import { motion, useReducedMotion } from 'framer-motion';
import SquareReveal from './SquareReveal';

const services = [
  {
    id: 1,
    name: 'Marketing',
    description:
      'Strategic campaigns that amplify your brand voice and drive measurable growth across all digital channels.',
    icon: '📊',
    color: 'var(--tarabi3-accent)',
  },
  {
    id: 2,
    name: 'Tech',
    description:
      'Custom software solutions, web applications, and digital products built with modern technologies.',
    icon: '⚡',
    color: 'var(--tarabi3-accent-alt)',
  },
  {
    id: 3,
    name: 'Branding',
    description:
      'Distinctive visual identities that capture your essence and create lasting impressions.',
    icon: '✨',
    color: 'var(--tarabi3-accent)',
  },
];

export default function ServicesBento() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="services"
      className="section"
      style={{
        backgroundColor: 'var(--tarabi3-secondary)',
        padding: '6rem 0',
      }}
    >
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 col-lg-8">
            <SquareReveal>
              <h2 className="section-title">What We Do</h2>
            </SquareReveal>
            <SquareReveal delay={0.1}>
              <p className="section-subtitle">
                We combine creativity with technical expertise to deliver
                solutions that move your business forward.
              </p>
            </SquareReveal>
          </div>
        </div>

        <motion.div
          className="row g-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`col-12 ${index === 0 ? 'col-md-12 col-lg-6' : 'col-md-6 col-lg-3'}`}
            >
              <motion.div
                variants={cardVariants}
                style={{
                  backgroundColor: 'rgba(10, 10, 10, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: index === 0 ? '3rem' : '2rem',
                  height: '100%',
                  minHeight: index === 0 ? '300px' : '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        borderColor: service.color,
                        transition: { duration: 0.3 },
                      }
                }
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '0%',
                    backgroundColor: service.color,
                  }}
                  whileHover={shouldReduceMotion ? {} : { height: '100%' }}
                  transition={{ duration: 0.4 }}
                />

                <div
                  style={{
                    fontSize: index === 0 ? '3rem' : '2rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  {service.icon}
                </div>

                <h3
                  style={{
                    fontSize: index === 0 ? '1.75rem' : '1.25rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--tarabi3-light)',
                  }}
                >
                  {service.name}
                </h3>

                <p
                  style={{
                    color: 'rgba(245, 245, 245, 0.6)',
                    fontSize: index === 0 ? '1rem' : '0.9rem',
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {service.description}
                </p>

                <motion.a
                  href={`#${service.name.toLowerCase()}`}
                  style={{
                    color: service.color,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    marginTop: '1.5rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          x: 5,
                          transition: { duration: 0.2 },
                        }
                  }
                >
                  Learn more →
                </motion.a>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
