import { Rating } from "./Rating";

export interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: Rating;
}

