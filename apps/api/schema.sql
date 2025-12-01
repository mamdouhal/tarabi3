-- Tarabi3 Database Schema
-- Run this with: wrangler d1 execute tarabi3-db --file=./schema.sql

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT,
  client TEXT,
  year INTEGER,
  featured INTEGER DEFAULT 0,
  tags TEXT,
  link TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  icon TEXT,
  color TEXT,
  features TEXT,
  order_index INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  service TEXT,
  budget TEXT,
  status TEXT DEFAULT 'new',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Team members table
CREATE TABLE IF NOT EXISTS team (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  linkedin TEXT,
  twitter TEXT,
  order_index INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  author_id INTEGER,
  category TEXT,
  tags TEXT,
  published INTEGER DEFAULT 0,
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES team(id)
);

-- Insert sample data

-- Sample services
INSERT OR IGNORE INTO services (name, slug, tagline, description, icon, color, features, order_index) VALUES
('Marketing', 'marketing', 'Amplify Your Voice', 'Strategic digital marketing campaigns that cut through the noise and connect with your audience.', '📊', '#e94560', 'Social Media,Content Marketing,SEO,PPC,Email Marketing,Analytics', 1),
('Technology', 'technology', 'Build the Future', 'Custom software solutions and digital products built with modern technologies.', '⚡', '#533483', 'Web Apps,Mobile Apps,E-commerce,API Development,Cloud,DevOps', 2),
('Branding', 'branding', 'Define Your Identity', 'Distinctive visual identities and brand strategies that create lasting impressions.', '✨', '#e94560', 'Brand Strategy,Logo Design,Visual Identity,UI/UX,Motion Graphics,Print', 3);

-- Sample projects
INSERT OR IGNORE INTO projects (title, slug, description, category, client, year, featured, tags) VALUES
('E-commerce Platform Redesign', 'ecommerce-redesign', 'Complete overhaul of an e-commerce platform resulting in 150% increase in conversions.', 'Technology', 'RetailCo', 2024, 1, 'Next.js,E-commerce,UI/UX'),
('Brand Identity for TechStartup', 'techstartup-branding', 'Created a modern, memorable brand identity for an emerging tech company.', 'Branding', 'TechStartup Inc', 2024, 1, 'Branding,Logo,Visual Identity'),
('Social Media Campaign', 'social-campaign', 'Viral social media campaign that reached 2M+ users organically.', 'Marketing', 'FoodBrand', 2024, 1, 'Social Media,Content,Strategy');
