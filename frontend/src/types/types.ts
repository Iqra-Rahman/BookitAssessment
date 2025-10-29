export interface Experience {
  id: number;
  title: string;
  description: string;
  price: number;
  available_slots: number;
  image_url: string;
  location: string;
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
