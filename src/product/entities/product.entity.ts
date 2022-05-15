export class Product {
  id?: number;
  name: string;
  description: string;
  barcode: string;
  image: string;
  inventory_min: number;
  unit: string;
  presentation: string;
  price_in: number;
  price_out: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  category: number;
  user: number;
}
