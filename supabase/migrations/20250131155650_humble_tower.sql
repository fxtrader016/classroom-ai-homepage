/*
  # Add display order column

  1. Changes
    - Add `display_order` column to `websites` table for controlling the display sequence
    - Add index on `display_order` for efficient sorting
    - Add comment explaining the column's purpose

  2. Notes
    - Default value of 0 ensures existing records have a valid order
    - Index improves performance when sorting by display_order
*/

-- Add display_order column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'websites' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE websites ADD COLUMN display_order integer DEFAULT 0;
    
    -- Add index for better sorting performance
    CREATE INDEX IF NOT EXISTS websites_display_order_idx ON websites(display_order);
    
    -- Add column comment
    COMMENT ON COLUMN websites.display_order IS 'Controls the display sequence of websites. Lower numbers appear first.';
  END IF;
END $$;