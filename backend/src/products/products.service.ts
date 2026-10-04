import { Injectable, NotFoundException } from '@nestjs/common';
import type { Product } from './product.interface';
import type { ProductOptions } from './product-options.interface';     // Import the ProductOptions interface

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


  


    getOptions(id: number): ProductOptions {
    this.findOne(id);

    return {
      sizes: [
        { id: 'S', extraPrice: 0 },
        { id: 'M', extraPrice: 5000 },
        { id: 'L', extraPrice: 10000 },
      ],
      toppings: [
        {
          id: 'espresso-shot',
          name: 'Thêm một shot espresso',
          price: 10000,
        },
        {
          id: 'milk-cream',
          name: 'Kem sữa',
          price: 8000,
        },
      ],
    };
  }

  findAll(): Product[] {
    return this.products;
  }
  findOne(id: number): Product {
  const product = this.products.find((item) => item.id === id);

  if (!product) {
    throw new NotFoundException('Không tìm thấy đồ uống.');
  }

  

  return product;
}


}