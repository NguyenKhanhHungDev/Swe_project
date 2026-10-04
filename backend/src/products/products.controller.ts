import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Product } from './product.interface';
import type { ProductOptions } from './product-options.interface'; // Import the ProductOptions interface

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Product {
    return this.productsService.findOne(id);
  }
    @Get(':id/options')
  getOptions(@Param('id', ParseIntPipe) id: number): ProductOptions {
    return this.productsService.getOptions(id);
  }
}