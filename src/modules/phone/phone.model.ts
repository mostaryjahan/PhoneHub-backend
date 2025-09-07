import { model, Schema } from 'mongoose';
import { Phone } from './phone.interface';

const phoneSchema = new Schema<Phone>(
  {
    brand: {
      type: String,
      enum: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Motorola', 'Nokia'],
      required: true,
    },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ['Official', 'Unofficial', 'Refurbished', 'Used'],
      required: true,
    },
    description: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: true, default: true },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    addedBy: { type: String },
    addedByName: { type: String },
  },
  { timestamps: true },
);

export const PhoneModel = model<Phone>('Phone', phoneSchema);