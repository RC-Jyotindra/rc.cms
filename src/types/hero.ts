export type HeroCard = {
  heading: string;
  description: string;
};

export type HeroContent = {
  id: string;
  page_slug: string;
  text_banner: string | null;
  banner_image_url: string | null;
  main_header: string | null;
  description_header: string | null;
  primary_button_label: string | null;
  primary_button_url: string | null;
  secondary_button_label: string | null;
  secondary_button_url: string | null;
  cards: HeroCard[] | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
};
