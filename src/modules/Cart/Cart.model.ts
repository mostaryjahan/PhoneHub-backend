import { Schema, model, Types } from 'mongoose';

export type TCartItem = {
    product: Types.ObjectId; // Ensure product is of ObjectId type
    quantity: number;
};

export type TCart = {
    email: string;
    items: TCartItem[];
};

const cartSchema = new Schema<TCart>(
  {
    email: { type: String, required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const CartModel = model<TCart>('Cart', cartSchema);
