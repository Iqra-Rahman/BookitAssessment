export interface Experience {
  id: number;
  title: string;
  description: string;
  price: number;
  location?: string;
  image_url: string;
}

export interface Booking {
  experience_id: number;
  user_name: string;
  email: string;
  slot_time: string;
}

export interface PromoResponse {
  valid: boolean;
  discount: number;
}
