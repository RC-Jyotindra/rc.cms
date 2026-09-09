-- 1. Create the hero_content table
CREATE TABLE hero_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL UNIQUE,
  text_banner TEXT,
  banner_image_url TEXT,
  main_header TEXT,
  description_header TEXT,
  primary_button_label TEXT,
  primary_button_url TEXT,
  secondary_button_label TEXT,
  secondary_button_url TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- 2. Create the storage bucket for banner images
INSERT INTO storage.buckets (id, name, public) VALUES ('banners', 'banners', true);

-- 3. Enable Row Level Security (RLS) on hero_content
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;

-- 4. Policies for hero_content
-- Public can read published heroes
CREATE POLICY "Public can view published hero content" ON hero_content
  FOR SELECT
  TO public
  USING (is_published = true);

-- Authenticated admins can do everything
CREATE POLICY "Admins can do everything" ON hero_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. Policies for Storage (banners bucket)
-- Public can read images
CREATE POLICY "Public can view banners" ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'banners');

-- Authenticated admins can insert/update/delete images
CREATE POLICY "Admins can upload banners" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'banners');

CREATE POLICY "Admins can update banners" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'banners');

CREATE POLICY "Admins can delete banners" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'banners');

-- 6. Trigger to automatically update the 'updated_at' column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_hero_content_updated_at
BEFORE UPDATE ON hero_content
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
