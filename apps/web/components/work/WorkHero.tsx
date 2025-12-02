'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function WorkHero() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    if (!shouldReduceMotion) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [shouldReduceMotion]);

  const floatingShapes = [
    { size: 120, x: '10%', y: '20%', delay: 0, rotation: 45 },
    { size: 80, x: '85%', y: '15%', delay: 0.2, rotation: -30 },
    { size: 150, x: '75%', y: '70%', delay: 0.4, rotation: 60 },
    { size: 60, x: '20%', y: '75%', delay: 0.6, rotation: -45 },
    { size: 100, x: '50%', y: '85%', delay: 0.8, rotation: 30 },
  ];

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--tarabi3-primary)',
        overflow: 'hidden',
        paddingTop: '100px',
      }}
    >
      {/* Animated gradient mesh */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(233, 69, 96, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(83, 52, 131, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(233, 69, 96, 0.05) 0%, transparent 70%)
          `,
        }}
      />

      {/* Floating 3D shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            border: '1px solid',
            borderColor: i % 2 === 0 ? 'rgba(233, 69, 96, 0.3)' : 'rgba(83, 52, 131, 0.3)',
            transform: `rotate(${shape.rotation}deg)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.5,
            scale: 1,
            x: shouldReduceMotion ? 0 : mousePosition.x * (i % 2 === 0 ? 1 : -1),
            y: shouldReduceMotion ? 0 : mousePosition.y * (i % 2 === 0 ? 1 : -1),
            rotate: shouldReduceMotion ? shape.rotation : [shape.rotation, shape.rotation + 360],
          }}
          transition={{
            opacity: { duration: 0.5, delay: shape.delay },
            scale: { duration: 0.5, delay: shape.delay },
            rotate: { duration: 30 + i * 5, repeat: Infinity, ease: 'linear' },
            x: { duration: 0.3 },
            y: { duration: 0.3 },
          }}
        />
      ))}

      {/* Particle effect */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? 'var(--tarabi3-accent)' : 'var(--tarabi3-accent-alt)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.3 }
                : {
                    y: [0, -100, 0],
                    opacity: [0, 0.6, 0],
                  }
            }
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 text-center">
            {/* Glitch effect text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
            >
              <motion.p
                style={{
                  fontSize: '0.875rem',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: 'var(--tarabi3-accent)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.span
                  style={{
                    width: '60px',
                    height: '1px',
                    background: 'var(--tarabi3-accent)',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
                Our Portfolio
                <motion.span
                  style={{
                    width: '60px',
                    height: '1px',
                    background: 'var(--tarabi3-accent)',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </motion.p>

              <h1
                style={{
                  fontSize: 'clamp(3rem, 10vw, 7rem)',
                  fontWeight: 900,
                  lineHeight: 0.9,
                  marginBottom: '2rem',
                  position: 'relative',
                }}
              >
                <motion.span
                  style={{ display: 'block', color: 'var(--tarabi3-light)' }}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Creative
                </motion.span>
                <motion.span
                  style={{
                    display: 'block',
                    background: 'linear-gradient(135deg, var(--tarabi3-accent), var(--tarabi3-accent-alt))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Works
                </motion.span>
              </h1>

              <motion.p
                style={{
                  fontSize: '1.25rem',
                  color: 'rgba(245, 245, 245, 0.7)',
                  maxWidth: '600px',
                  margin: '0 auto 3rem',
                  lineHeight: 1.7,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                From intelligent management systems to cutting-edge AI tools,
                explore how we transform ideas into digital excellence.
              </motion.p>

              {/* Stats row */}
              <motion.div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '3rem',
                  flexWrap: 'wrap',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {[
                  { value: '50+', label: 'Projects' },
                  { value: '30+', label: 'Clients' },
                  { value: '3', label: 'Categories' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    style={{ textAlign: 'center' }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, var(--tarabi3-accent), var(--tarabi3-accent-alt))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </span>
                    <span style={{ color: 'rgba(245, 245, 245, 0.6)', fontSize: '0.9rem' }}>
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
