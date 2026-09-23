import { Injectable } from '@nestjs/common';
import type { Product } from './product.interface';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'Cà phê sữa',
      price: 35000,
      imageUrl: '/images/ca-phe-sua.jpg',
    },
    {
      id: 2,
      name: 'Americano',
      price: 40000,
      imageUrl: '/images/americano.jpg',
    },
    {
      id: 3,
      name: 'Latte',
      price: 45000,
      imageUrl: '/images/latte.jpg',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }
}