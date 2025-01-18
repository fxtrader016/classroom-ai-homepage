/*
  # Add favicon URL to websites table

  1. Changes
    - Add favicon_url column to websites table
    - Make it nullable to maintain compatibility with existing records
    - Add comment explaining the column's purpose

  2. Notes
    - Existing records will have NULL favicon_url
    - Administrators can update favicon URLs through the dashboard
*/

ALTER TABLE websites
ADD COLUMN IF NOT EXISTS favicon_url text;

COMMENT ON COLUMN websites.favicon_url IS 'URL to the website''s favicon image. If not provided, will fall back to default icon.';