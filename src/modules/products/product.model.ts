import { v4 as uuid4 } from 'uuid';

export class Product {
  _id: string;
  name: string;
  stock: number;
  category: Category[];
  price: number;
  detail: string;
  image: string;
  status: boolean;
  created_at: number;
  updated_at: number;
  deleted_at?: number;

  constructor(name: string, stock: number, category: Category[], price: number, detail: string, image: string, status: boolean, created_at: number, updated_at: number, deleted_at?: number) {
    this._id = uuid4();
    this.name = name;
    this.stock = stock;
    this.category = category;
    this.price = price;
    this.detail = detail;
    this.image = image;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}

export class Category {
  _id: string;
  name: string;

  constructor(name: string) {
    this._id = uuid4();
    this.name = name;
  }
}
