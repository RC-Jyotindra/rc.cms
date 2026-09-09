-- Add a JSONB cards column to the existing hero_content table for Participant Honorarium & Privacy Policies.
-- Each element: { "heading": "...", "description": "..." }
ALTER TABLE hero_content
  ADD COLUMN IF NOT EXISTS cards JSONB DEFAULT '[
    {"heading": "Participant Honorarium Policy", "description": "Honorariums and gift vouchers are research tokens provided in accordance with ESOMAR international guidelines to thank citizens for their dedicated time. Only qualified, unique, and non-fraudulent submissions are processed."},
    {"heading": "Data Protection Standard", "description": "We adhere strictly to DPDP Act principles. Personal identifying information (PII) is isolated from survey responses during statistical calculation to safeguard individual participant privacy."},
    {"heading": "Institutional Authenticity", "description": "Research Connect USA is an independent research consulting collective. We do not sell consumer loans, financial instruments, or physical goods."}
  ]'::jsonb;

-- Populate existing rows where cards is NULL or empty
UPDATE hero_content
SET cards = '[
  {"heading": "Participant Honorarium Policy", "description": "Honorariums and gift vouchers are research tokens provided in accordance with ESOMAR international guidelines to thank citizens for their dedicated time. Only qualified, unique, and non-fraudulent submissions are processed."},
  {"heading": "Data Protection Standard", "description": "We adhere strictly to DPDP Act principles. Personal identifying information (PII) is isolated from survey responses during statistical calculation to safeguard individual participant privacy."},
  {"heading": "Institutional Authenticity", "description": "Research Connect USA is an independent research consulting collective. We do not sell consumer loans, financial instruments, or physical goods."}
]'::jsonb
WHERE cards IS NULL OR cards = '[]'::jsonb;
