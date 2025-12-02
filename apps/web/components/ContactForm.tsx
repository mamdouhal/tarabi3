'use client';

import { useState } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef } from 'react';

const API_BASE_URL = 'https://tarabi3-api.mamdouh200464.workers.dev';

export default function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    'Digital Marketing',
    'Web Development',
    'Brand Identity',
    'Social Media',
    'SEO & Analytics',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem 1.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'var(--tarabi3-light)',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: 'rgba(245, 245, 245, 0.7)',
    fontSize: '0.9rem',
    fontWeight: 500,
  };

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        padding: '120px 0',
        backgroundColor: 'var(--tarabi3-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background effects */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--tarabi3-accent) 0%, transparent 70%)',
          opacity: 0.05,
          filter: 'blur(100px)',
          top: '-200px',
          right: '-200px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--tarabi3-accent-alt) 0%, transparent 70%)',
          opacity: 0.05,
          filter: 'blur(100px)',
          bottom: '-100px',
          left: '-100px',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row g-5">
          {/* Left side - Info */}
          <div className="col-12 col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
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
                Get In Touch
              </p>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: '1.5rem',
                }}
              >
                Let's{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, var(--tarabi3-accent), var(--tarabi3-accent-alt))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Talk
                </span>
              </h2>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'rgba(245, 245, 245, 0.7)',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}
              >
                Have a project in mind? We'd love to hear about it. Send us a message 
                and we'll get back to you within 24 hours.
              </p>

              {/* Contact info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: '📧', label: 'Email', value: 'hello@tarabi3.com' },
                  { icon: '📱', label: 'WhatsApp', value: '+971 50 XXX XXXX' },
                  { icon: '📍', label: 'Location', value: 'Dubai, UAE' },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1.5rem',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(233, 69, 96, 0.1)',
                        border: '1px solid rgba(233, 69, 96, 0.2)',
                      }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: 'rgba(245, 245, 245, 0.5)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{
                          fontSize: '1rem',
                          color: 'var(--tarabi3-light)',
                          fontWeight: 500,
                          margin: 0,
                        }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - Form */}
          <div className="col-12 col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.2 }}
              style={{
                padding: '2.5rem',
                backgroundColor: 'var(--tarabi3-secondary)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: '3rem',
                  }}
                >
                  <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🎉</span>
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      color: 'var(--tarabi3-light)',
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: 'rgba(245, 245, 245, 0.7)', marginBottom: '2rem' }}>
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    style={{
                      padding: '0.75rem 2rem',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--tarabi3-accent)',
                      color: 'var(--tarabi3-accent)',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* Name */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="name" style={labelStyle}>
                        Full Name <span style={{ color: 'var(--tarabi3-accent)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        style={inputStyle}
                      />
                    </div>

                    {/* Email */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="email" style={labelStyle}>
                        Email Address <span style={{ color: 'var(--tarabi3-accent)' }}>*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        style={inputStyle}
                      />
                    </div>

                    {/* Phone */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="phone" style={labelStyle}>
                        Phone / WhatsApp <span style={{ color: 'var(--tarabi3-accent)' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+971 50 XXX XXXX"
                        style={inputStyle}
                      />
                    </div>

                    {/* Company */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="company" style={labelStyle}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        style={inputStyle}
                      />
                    </div>

                    {/* Service */}
                    <div className="col-12">
                      <label htmlFor="service" style={labelStyle}>
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        style={{
                          ...inputStyle,
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23f5f5f5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1.5rem',
                        }}
                      >
                        <option value="" style={{ backgroundColor: 'var(--tarabi3-secondary)' }}>
                          Select a service
                        </option>
                        {services.map((service) => (
                          <option
                            key={service}
                            value={service}
                            style={{ backgroundColor: 'var(--tarabi3-secondary)' }}
                          >
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="col-12">
                      <label htmlFor="message" style={labelStyle}>
                        Your Message <span style={{ color: 'var(--tarabi3-accent)' }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your project..."
                        rows={5}
                        style={{
                          ...inputStyle,
                          resize: 'vertical',
                          minHeight: '120px',
                        }}
                      />
                    </div>

                    {/* Error message */}
                    {status === 'error' && (
                      <div className="col-12">
                        <div
                          style={{
                            padding: '1rem',
                            backgroundColor: 'rgba(220, 53, 69, 0.1)',
                            border: '1px solid rgba(220, 53, 69, 0.3)',
                            color: '#ff6b6b',
                          }}
                        >
                          ⚠️ {errorMessage}
                        </div>
                      </div>
                    )}

                    {/* Submit button */}
                    <div className="col-12">
                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        style={{
                          width: '100%',
                          padding: '1.25rem 2rem',
                          background: status === 'loading'
                            ? 'rgba(233, 69, 96, 0.5)'
                            : 'linear-gradient(135deg, var(--tarabi3-accent), var(--tarabi3-accent-alt))',
                          border: 'none',
                          color: 'white',
                          fontSize: '1rem',
                          fontWeight: 600,
                          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.75rem',
                        }}
                        whileHover={
                          status !== 'loading' && !shouldReduceMotion
                            ? { scale: 1.02, boxShadow: '0 10px 40px rgba(233, 69, 96, 0.3)' }
                            : {}
                        }
                        whileTap={status !== 'loading' && !shouldReduceMotion ? { scale: 0.98 } : {}}
                      >
                        {status === 'loading' ? (
                          <>
                            <span
                              style={{
                                width: '20px',
                                height: '20px',
                                border: '2px solid white',
                                borderTopColor: 'transparent',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                              }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <span>→</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        input:focus,
        textarea:focus,
        select:focus {
          border-color: var(--tarabi3-accent) !important;
          box-shadow: 0 0 0 2px rgba(233, 69, 96, 0.1);
        }
      `}</style>
    </section>
  );
}
