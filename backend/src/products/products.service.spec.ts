import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return products with valid fields and unique ids', () => {
    const products = service.findAll();

    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      expect(Number.isInteger(product.id)).toBe(true);
      expect(product.id).toBeGreaterThan(0);

      expect(typeof product.name).toBe('string');
      expect(product.name.trim().length).toBeGreaterThan(0);

      expect(Number.isFinite(product.price)).toBe(true);
      expect(product.price).toBeGreaterThan(0);

      expect(typeof product.imageUrl).toBe('string');
      expect(product.imageUrl.trim().length).toBeGreaterThan(0);
    }

    const ids = products.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});