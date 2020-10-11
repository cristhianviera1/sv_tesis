export class Product {
  _id: string;
  name: string;
  stock: number;
  category: string[];
  price: number;
  detail: string;
  image: string;
  status: boolean;
  created_at: number;
  updated_at: number;
  deleted_at?: number;
}
