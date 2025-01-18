/*
  # Website Hub Database Schema

  1. New Tables
    - `websites`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `url` (text, required)
      - `category` (text, required) - enum: 'top', 'good', 'medium', 'meh'
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `websites` table
    - Add policies for:
      - Public read access
      - Authenticated admin users full CRUD access
*/

-- Create enum type for categories
CREATE TYPE website_category AS ENUM ('top', 'good', 'medium', 'meh');

-- Create websites table
CREATE TABLE IF NOT EXISTS websites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text NOT NULL,
  category website_category NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

-- Enable RLS
ALTER TABLE websites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
  ON websites
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin CRUD operations"
  ON websites
  USING (auth.uid() = user_id);