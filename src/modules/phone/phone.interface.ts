export type Phone = {
  brand: 'Apple' | 'Samsung' | 'Google' | 'OnePlus' | 'Xiaomi' | 'Motorola' | 'Nokia';
  model: string;
  year: number;
  price: number;
  category: 'Official' | 'Unofficial' | 'Refurbished' | 'Used';
  description: string;
  image: string;
  quantity: number;
  inStock: boolean;
  discount?: number;
  addedBy?: string;
  addedByName?: string;
};