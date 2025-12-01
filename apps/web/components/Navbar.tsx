'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem 0',
        backgroundColor: scrolled
          ? 'rgba(10, 10, 10, 0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-auto">
            <a
              href="/"
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--tarabi3-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'var(--tarabi3-accent)',
                }}
              />
              Tarabi3
            </a>
          </div>

          <div className="col d-none d-md-block">
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'center',
                gap: '2.5rem',
                margin: 0,
                padding: 0,
              }}
            >
              {navLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    style={{
                      color: 'rgba(245, 245, 245, 0.8)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      position: 'relative',
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : { color: 'var(--tarabi3-accent)' }
                    }
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-auto">
            <motion.a
              href="#contact"
              style={{
                display: 'inline-block',
                padding: '0.5rem 1.25rem',
                backgroundColor: 'var(--tarabi3-accent)',
                color: 'var(--tarabi3-light)',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: 'none',
                borderRadius: 0,
              }}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      backgroundColor: 'var(--tarabi3-accent-alt)',
                    }
              }
            >
              Let&apos;s Talk
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
