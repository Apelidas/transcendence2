-- Create the database if it doesn't exist
CREATE DATABASE mydatabase;

-- Connect to the database
\c mydatabase

-- Drop the users table if it exists (to avoid conflicts during repeated runs)
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    ID SERIAL PRIMARY KEY,
    EMAIL VARCHAR(255) UNIQUE NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL
    );


INSERT INTO users (EMAIL, PASSWORD) VALUES ('test@example.com', 'hashed_password');

