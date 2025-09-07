
import { z } from 'zod';

const createPhoneValidationSchema = z.object({
  body: z.object({
    brand: z.enum(['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Motorola', 'Nokia'], {
      required_error: 'Brand is required',
    }),
    model: z.string({ required_error: 'Model is required' }),
    year: z.number({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a number',
    }),
    price: z.number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    }).min(0, { message: 'Price must be 0 or greater' }),
    category: z.enum(['Official', 'Unofficial', 'Refurbished', 'Used'], {
      required_error: 'Category is required',
    }),
    description: z.string({ required_error: 'Description is required' }),
    image: z.string({ required_error: 'Image is required' }),
    quantity: z.number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    }).min(0, { message: 'Quantity must be 0 or greater' }),
    inStock: z.boolean({ required_error: 'In stock status is required' }),
    discount: z.number()
      .min(0, { message: 'Discount cannot be negative' })
      .max(100, { message: 'Discount cannot exceed 100%' })
      .optional()
      .default(0),
    addedBy: z.string().optional(),
    addedByName: z.string().optional(),
  }),
});



const updatePhoneValidationSchema = z.object({
  body: z.object({
    brand: z.enum(['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Motorola', 'Nokia']).optional(),
    model: z.string().optional(),
    year: z
      .number({
        invalid_type_error: 'Year must be a number',
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: 'Price must be a number',
      })
      .min(0, {message: 'Price must be 0 or greater'})
      .optional(),
    category: z
      .enum(['Official', 'Unofficial', 'Refurbished', 'Used'])
      .optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    quantity: z
      .number({
        invalid_type_error: 'Quantity must be a number',
      })
      .min(0, {message: 'Quantity must be 0 or greater'})
      .optional(),
    inStock: z.boolean().optional(),
  }),
});

export const PhoneValidation = {
  createPhoneValidationSchema,
  updatePhoneValidationSchema,
};