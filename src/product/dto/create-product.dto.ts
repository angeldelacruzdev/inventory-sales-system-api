export class CreateProductDto {
  id?: number;
  name: string;
  description: string;
  barcode: string;
  image: string;
  inventory_min: number;
  unit: string;
  presentation: string;
  price_in: string;
  price_out: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  category: any;
  user: any;
}
