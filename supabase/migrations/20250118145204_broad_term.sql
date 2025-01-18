/*
  # Add not_working category to website_category enum

  1. Changes
    - Add 'not_working' as a new value to the website_category enum type
    
  2. Notes
    - Uses safe ALTER TYPE ... ADD VALUE syntax
    - Ensures backward compatibility
*/

ALTER TYPE website_category ADD VALUE IF NOT EXISTS 'not_working';

COMMENT ON TYPE website_category IS 'Categories for website classification: top, good, medium, meh, not_working';