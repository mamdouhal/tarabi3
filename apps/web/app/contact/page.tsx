'use client';

import { motion, useReducedMotion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
      {/* Hero Section */}
      <section
        style={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '100px',
        }}
      >
        {/* Animated Background Elements */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -30, 0],
                      x: [0, 15 * (i % 2 === 0 ? 1 : -1), 0],
                      opacity: [0.1, 0.3, 0.1],
                    }
              }
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                position: 'absolute',
                width: `${100 + i * 40}px`,
                height: `${100 + i * 40}px`,
                borderRadius: '20%',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                top: `${10 + (i * 25) % 60}%`,
                left: `${5 + (i * 17) % 80}%`,
                transform: `rotate(${i * 15}deg)`,
              }}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                fontWeight: 700,
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Let's Talk
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'rgba(255, 255, 255, 0.6)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Ready to transform your ideas into reality? We're here to help
              bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        style={{
          padding: '0 1.5rem 6rem',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <div
          className="row"
          style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}
        >
          {/* Contact Info */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ flex: '1 1 300px' }}
          >
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#fff',
                marginBottom: '2rem',
              }}
            >
              Get in Touch
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Email */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0,
                  }}
                >
                  ✉️
                </div>
                <div>
                  <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.25rem' }}>
                    Email Us
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    hello@tarabi3.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0,
                  }}
                >
                  📞
                </div>
                <div>
                  <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.25rem' }}>
                    Call Us
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    +20 123 456 7890
                  </p>
                </div>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0,
                  }}
                >
                  📍
                </div>
                <div>
                  <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.25rem' }}>
                    Location
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    Cairo, Egypt
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0,
                  }}
                >
                  🕐
                </div>
                <div>
                  <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.25rem' }}>
                    Working Hours
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    Sun - Thu: 9AM - 6PM
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}>
                Follow Us
              </h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['LinkedIn', 'Twitter', 'Instagram', 'GitHub'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={shouldReduceMotion ? {} : { y: -3 }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: '0.75rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {social.charAt(0)}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ flex: '2 1 500px' }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </main>
    </>
  );
}
