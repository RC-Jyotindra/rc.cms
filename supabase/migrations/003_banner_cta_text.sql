-- Add banner_cta_text column to hero_content table
ALTER TABLE hero_content
  ADD COLUMN IF NOT EXISTS banner_cta_text TEXT DEFAULT 'Claim Offer';

-- Update existing rows where banner_cta_text is null
UPDATE hero_content
SET banner_cta_text = 'Claim Offer'
WHERE banner_cta_text IS NULL;
