'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    id: 'marketing',
    number: '01',
    title: 'Marketing',
    tagline: 'Amplify Your Voice',
    description: 'Strategic digital marketing campaigns that cut through the noise and connect with your audience on a deeper level.',
    features: [
      'Social Media Strategy & Management',
      'Content Marketing & SEO',
      'Paid Advertising (PPC, Social Ads)',
      'Email Marketing Automation',
      'Analytics & Performance Tracking',
      'Influencer Partnerships',
    ],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M24 4V44" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 14L24 24L44 14" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: '#e94560',
  },
  {
    id: 'tech',
    number: '02',
    title: 'Technology',
    tagline: 'Build the Future',
    description: 'Custom software solutions and digital products built with modern technologies that scale with your ambitions.',
    features: [
      'Web Application Development',
      'Mobile App Development',
      'E-commerce Solutions',
      'API Development & Integration',
      'Cloud Infrastructure (AWS, GCP)',
      'DevOps & CI/CD Pipelines',
    ],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="8" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 16H44" stroke="currentColor" strokeWidth="2"/>
        <circle cx="10" cy="12" r="2" fill="currentColor"/>
        <circle cx="16" cy="12" r="2" fill="currentColor"/>
        <path d="M16 40H32" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 36V40" stroke="currentColor" strokeWidth="2"/>
        <path d="M28 36V40" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: '#533483',
  },
  {
    id: 'branding',
    number: '03',
    title: 'Branding',
    tagline: 'Define Your Identity',
    description: 'Distinctive visual identities and brand strategies that capture your essence and create lasting impressions.',
    features: [
      'Brand Strategy & Positioning',
      'Logo & Visual Identity Design',
      'Brand Guidelines & Systems',
      'UI/UX Design',
      'Motion Graphics & Animation',
      'Print & Packaging Design',
    ],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
        <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="2"/>
        <circle cx="24" cy="24" r="4" fill="currentColor"/>
      </svg>
    ),
    color: '#e94560',
  },
];

export default function ServiceShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const [activeService, setActiveService] = useState(services[0].id);

  const activeData = services.find(s => s.id === activeService) || services[0];

  return (
    <section
      style={{
        backgroundColor: 'var(--tarabi3-secondary)',
        padding: '8rem 0',
        position: 'relative',
      }}
    >
      {/* Background grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Service Tabs */}
        <div className="row mb-5">
          <div className="col-12">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  style={{
                    padding: '1rem 2rem',
                    background: activeService === service.id
                      ? `linear-gradient(135deg, ${service.color}20, ${service.color}10)`
                      : 'transparent',
                    border: `2px solid ${activeService === service.id ? service.color : 'rgba(255,255,255,0.1)'}`,
                    color: activeService === service.id ? service.color : 'rgba(255,255,255,0.6)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  <span style={{ opacity: 0.5, fontSize: '0.875rem' }}>{service.number}</span>
                  {service.title}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Service Content */}
        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
        >
          <div className="row align-items-center g-5">
            {/* Left: Info */}
            <div className="col-12 col-lg-6">
              <div
                style={{
                  color: activeData.color,
                  marginBottom: '1rem',
                }}
              >
                {activeData.icon}
              </div>
              
              <h2
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                  color: 'var(--tarabi3-light)',
                }}
              >
                {activeData.title}
              </h2>
              
              <p
                style={{
                  fontSize: '1.25rem',
                  color: activeData.color,
                  marginBottom: '1.5rem',
                  fontWeight: 500,
                }}
              >
                {activeData.tagline}
              </p>
              
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'rgba(245, 245, 245, 0.7)',
                  lineHeight: 1.8,
                  marginBottom: '2rem',
                }}
              >
                {activeData.description}
              </p>

              <motion.a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  backgroundColor: activeData.color,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
                whileHover={shouldReduceMotion ? {} : { x: 5 }}
              >
                Get Started
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </motion.a>
            </div>

            {/* Right: Features Grid */}
            <div className="col-12 col-lg-6">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                }}
              >
                {activeData.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.3,
                      delay: shouldReduceMotion ? 0 : index * 0.1,
                    }}
                    style={{
                      padding: '1.5rem',
                      backgroundColor: 'rgba(10, 10, 10, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Number indicator */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.75rem',
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: activeData.color,
                        opacity: 0.15,
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: activeData.color,
                        marginBottom: '0.75rem',
                      }}
                    />
                    
                    <p
                      style={{
                        color: 'var(--tarabi3-light)',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {feature}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
