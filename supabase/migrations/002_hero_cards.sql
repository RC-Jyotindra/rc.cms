-- Add a JSONB cards column to the existing hero_content table.
-- Each element: { "heading": "...", "description": "..." }
ALTER TABLE hero_content
  ADD COLUMN IF NOT EXISTS cards JSONB DEFAULT '[]'::jsonb;
