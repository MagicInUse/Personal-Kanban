-- Seed Users
INSERT INTO users (username, password) VALUES
('JollyGuru', 'password'),
('SunnyScribe', 'password'),
('RadiantComet', 'password');

-- Seed Tickets
INSERT INTO tickets (name, status, description, assignedUserId) VALUES
('Design landing page', 'In Progress', 'Create wireframes and mockups for the landing page.', 1),
('Set up project repository', 'Done', 'Create a new repository on GitHub and initialize it with a README file.', 2),
('Implement authentication', 'Todo', 'Set up user authentication using JWT tokens.', 1),
('Test the API', 'Todo', 'Test the API using Insomnia.', 1),
('Deploy to production', 'Todo', 'Deploy the application to Render.', 2);