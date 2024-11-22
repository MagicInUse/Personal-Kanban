-- -- DROP DATABASE
-- DROP DATABASE IF EXISTS kanban_db;

-- -- CREATE DATABASE
-- CREATE DATABASE kanban_db;

-- -- USE DATABASE
-- \c kanban_db

-- CREATE TABLE users
-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR(255) NOT NULL,
--   password VARCHAR(255) NOT NULL,
--   createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- Seed Users
INSERT INTO users (username, password) VALUES
('JollyGuru', 'password'),
('SunnyScribe', 'password'),
('RadiantComet', 'password');

-- CREATE TABLE tickets
-- CREATE TABLE tickets (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   status VARCHAR(255) NOT NULL,
--   description TEXT,
--   assignedUserId INT REFERENCES users(id),
--   createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- Seed Tickets
INSERT INTO tickets (name, status, description, assignedUserId) VALUES
('Design landing page', 'In Progress', 'Create wireframes and mockups for the landing page.', 1),
('Set up project repository', 'Done', 'Create a new repository on GitHub and initialize it with a README file.', 2),
('Implement authentication', 'Todo', 'Set up user authentication using JWT tokens.', 1),
('Test the API', 'Todo', 'Test the API using Insomnia.', 1),
('Deploy to production', 'Todo', 'Deploy the application to Render.', 2);