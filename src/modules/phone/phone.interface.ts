
export type Phone = {
    brand: string;
    model: string;
    year: number;
    price: number;
    category:'Apple' | 'Samsung'| 'Google'| 'Huawei'| 'Xiaomi'| 'Motorola'| 'Nokia';
    description:string;
    image:string;
    quantity:number;
    inStock:boolean;
  }