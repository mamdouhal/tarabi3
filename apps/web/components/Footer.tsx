'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'Marketing', href: '#marketing' },
      { label: 'Tech Solutions', href: '#tech' },
      { label: 'Branding', href: '#branding' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Work', href: '#work' },
      { label: 'Careers', href: '#careers' },
    ],
    connect: [
      { label: 'Contact', href: '#contact' },
      { label: 'LinkedIn', href: '#linkedin' },
      { label: 'Twitter', href: '#twitter' },
    ],
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--tarabi3-primary)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '5rem 0 2rem',
      }}
    >
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand Column */}
          <div className="col-12 col-lg-4">
            <a
              href="/"
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--tarabi3-light)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  backgroundColor: 'var(--tarabi3-accent)',
                }}
              />
              Tarabi3
            </a>
            <p
              style={{
                color: 'rgba(245, 245, 245, 0.6)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                maxWidth: '300px',
              }}
            >
              Digital solutions that multiply your success. We build with geometric precision.
            </p>
          </div>

          {/* Services Column */}
          <div className="col-6 col-md-4 col-lg-2 offset-lg-2">
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--tarabi3-light)',
                marginBottom: '1.25rem',
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.services.map((link) => (
                <li key={link.label} style={{ marginBottom: '0.75rem' }}>
                  <motion.a
                    href={link.href}
                    style={{
                      color: 'rgba(245, 245, 245, 0.6)',
                      fontSize: '0.9rem',
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

          {/* Company Column */}
          <div className="col-6 col-md-4 col-lg-2">
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--tarabi3-light)',
                marginBottom: '1.25rem',
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.company.map((link) => (
                <li key={link.label} style={{ marginBottom: '0.75rem' }}>
                  <motion.a
                    href={link.href}
                    style={{
                      color: 'rgba(245, 245, 245, 0.6)',
                      fontSize: '0.9rem',
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

          {/* Connect Column */}
          <div className="col-6 col-md-4 col-lg-2">
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--tarabi3-light)',
                marginBottom: '1.25rem',
              }}
            >
              Connect
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.connect.map((link) => (
                <li key={link.label} style={{ marginBottom: '0.75rem' }}>
                  <motion.a
                    href={link.href}
                    style={{
                      color: 'rgba(245, 245, 245, 0.6)',
                      fontSize: '0.9rem',
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
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <p
            style={{
              color: 'rgba(245, 245, 245, 0.4)',
              fontSize: '0.875rem',
              margin: 0,
            }}
          >
            © {currentYear} Tarabi3. All rights reserved.
          </p>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <motion.a
              href="#privacy"
              style={{
                color: 'rgba(245, 245, 245, 0.4)',
                fontSize: '0.875rem',
              }}
              whileHover={
                shouldReduceMotion ? {} : { color: 'var(--tarabi3-light)' }
              }
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#terms"
              style={{
                color: 'rgba(245, 245, 245, 0.4)',
                fontSize: '0.875rem',
              }}
              whileHover={
                shouldReduceMotion ? {} : { color: 'var(--tarabi3-light)' }
              }
            >
              Terms of Service
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
