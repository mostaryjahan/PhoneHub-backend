import { model, Schema } from 'mongoose';
import { Phone } from './phone.interface';

const phoneSchema = new Schema<Phone>(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true, min: 2020 },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ['Apple', 'Samsung', 'Google', 'Huawei', 'Xiaomi', 'Motorola', 'Nokia'],
      required: true,
    },
    description: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

export const PhoneModel = model<Phone>('Phone', phoneSchema);
