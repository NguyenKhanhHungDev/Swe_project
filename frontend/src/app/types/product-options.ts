export interface SizeOption {
  id: 'S' | 'M' | 'L';
  extraPrice: number;
}

export interface ToppingOption {
  id: string;
  name: string;
  price: number;
}

export interface ProductOptions {
  sizes: SizeOption[];
  toppings: ToppingOption[];
}