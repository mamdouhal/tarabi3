'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function TeamSection() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const team = [
    {
      name: 'Ahmed Hassan',
      role: 'Founder & CEO',
      bio: 'Visionary leader with 10+ years in digital transformation.',
      avatar: '👨‍💼',
      color: '#e94560',
    },
    {
      name: 'Sara Al-Rashid',
      role: 'Creative Director',
      bio: 'Award-winning designer passionate about visual storytelling.',
      avatar: '👩‍🎨',
      color: '#533483',
    },
    {
      name: 'Omar Farouk',
      role: 'Tech Lead',
      bio: 'Full-stack architect building scalable, innovative solutions.',
      avatar: '👨‍💻',
      color: '#e94560',
    },
    {
      name: 'Layla Mahmoud',
      role: 'Marketing Director',
      bio: 'Data-driven strategist who turns insights into growth.',
      avatar: '👩‍💼',
      color: '#533483',
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
      {/* Animated background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at center, rgba(233, 69, 96, 0.03) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
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
            The Minds Behind
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            Meet Our Team
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(245, 245, 245, 0.7)',
              maxWidth: '550px',
              margin: '0 auto',
            }}
          >
            A diverse group of thinkers, creators, and innovators united by a passion for excellence.
          </p>
        </motion.div>

        <div className="row g-4 justify-content-center">
          {team.map((member, index) => (
            <div key={member.name} className="col-12 col-sm-6 col-lg-3">
              <motion.div
                style={{
                  textAlign: 'center',
                  padding: '2.5rem 1.5rem',
                  background: hoveredMember === index
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor: hoveredMember === index ? member.color : 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.15,
                }}
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Avatar container */}
                <motion.div
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${member.color}20, ${member.color}10)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    margin: '0 auto 1.5rem',
                    border: `2px solid ${member.color}30`,
                    position: 'relative',
                  }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
                >
                  {member.avatar}
                  
                  {/* Ring animation */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: -8,
                      borderRadius: '50%',
                      border: `2px solid ${member.color}`,
                      opacity: hoveredMember === index ? 0.5 : 0,
                    }}
                    animate={
                      hoveredMember === index && !shouldReduceMotion
                        ? { scale: [1, 1.2], opacity: [0.5, 0] }
                        : {}
                    }
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                    color: 'var(--tarabi3-light)',
                  }}
                >
                  {member.name}
                </h3>
                
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: member.color,
                    fontWeight: 500,
                    marginBottom: '1rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {member.role}
                </p>
                
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(245, 245, 245, 0.6)',
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {member.bio}
                </p>

                {/* Social links placeholder */}
                <motion.div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    marginTop: '1.5rem',
                    opacity: hoveredMember === index ? 1 : 0,
                    transform: hoveredMember === index ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {['in', 'tw', 'gh'].map((social) => (
                    <span
                      key={social}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        color: 'rgba(245, 245, 245, 0.7)',
                        cursor: 'pointer',
                      }}
                    >
                      {social}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Join team CTA */}
        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.8 }}
        >
          <p style={{ color: 'rgba(245, 245, 245, 0.6)', marginBottom: '1rem' }}>
            Want to join our team?
          </p>
          <motion.a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--tarabi3-accent)',
              fontSize: '1rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}
            whileHover={shouldReduceMotion ? {} : { x: 5 }}
          >
            View open positions
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
