import { Types } from "mongoose";


export type TCartItem = {
    product: Types.ObjectId;
    email: string;
    quantity: number;
  };
  
  export type TCart = {
    email: string;
    items: TCartItem[];
  };