-- Drop existing tables
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS users;

-- Create Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Tickets table
CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  assigned_user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Users
INSERT INTO users (username, password, created_at, updated_at) VALUES
('JollyGuru', 'password', NOW(), NOW()),
('SunnyScribe', 'password', NOW(), NOW()),
('RadiantComet', 'password', NOW(), NOW());

-- Seed Tickets
INSERT INTO tickets (name, status, description, assigned_user_id, created_at, updated_at) VALUES
('Design landing page', 'In Progress', 'Create wireframes and mockups for the landing page.', 1, NOW(), NOW()),
('Set up project repository', 'Done', 'Create a new repository on GitHub and initialize it with a README file.', 2, NOW(), NOW()),
('Implement authentication', 'Todo', 'Set up user authentication using JWT tokens.', 1, NOW(), NOW()),
('Test the API', 'Todo', 'Test the API using Insomnia.', 1, NOW(), NOW()),
('Deploy to production', 'Todo', 'Deploy the application to Render.', 2, NOW(), NOW());