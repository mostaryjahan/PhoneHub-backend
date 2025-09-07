import mongoose from 'mongoose';
import { PhoneModel } from '../phone/phone.model';
import { CartModel } from './Cart.model';

const addToCart = async (email: string, productId: string) => {
  const phone = await PhoneModel.findById(productId);

  if (!phone) throw new Error('Phone not found');

  // Ensure that there is enough stock
  if (phone.quantity <= 0) throw new Error('Phone is out of stock');
  // console.log(productId);
  let cart = await CartModel.findOne({ email });

  if (!cart) {
    cart = new CartModel({ email, items: [] });
  }

  // Find if the product already exists in the cart
  const isExistItem = cart.items.find((item) => item.product.equals(productId));
  // console.log(isExistItem);

  if (isExistItem) {
    // If product already exists, increase its quantity
    const itemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId),
    );
    cart.items[itemIndex].quantity += 1;
    phone.quantity -= 1;
  } else {
    // If product does not exist, add a new entry

    cart.items.push({
      product: new mongoose.Types.ObjectId(productId),
      quantity: 1,
    });
    phone.quantity -= 1;
  }

  await phone.save();
  await cart.save();
  return cart;
};

const getUserCart = async (email: string) => {
  const res = await CartModel.findOne({ email }).populate('items.product');

  return res;
};

const increaseQuantity = async (email: string, productId: string) => {
  const phone = await PhoneModel.findById(productId);
  if (!phone) throw new Error('Phone not found');

  // Ensure that there is enough stock
  if (phone.quantity <= 0) throw new Error('Phone is out of stock');
  // console.log(productId);
  const cart = await CartModel.findOne({ email });

  if (!cart) throw new Error('Cart not found');

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );

  if (itemIndex === -1) throw new Error('Item not found in cart');

  cart.items[itemIndex].quantity += 1;
  phone.quantity -= 1;
  await phone.save();
  await cart.save();
  console.log('cart', cart);
  return cart;
};

const decreaseQuantity = async (email: string, productId: string) => {
  const phone = await PhoneModel.findById(productId);
  if (!phone) throw new Error('Phone not found');

  const cart = await CartModel.findOne({ email });

  if (!cart) throw new Error('Cart not found');

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );

  if (itemIndex === -1) throw new Error('Item not found in cart');

  if (cart.items[itemIndex].quantity > 1) {
    cart.items[itemIndex].quantity -= 1;
    phone.quantity += 1;
  } else {
    cart.items.splice(itemIndex, 1);
  }

  if (cart.items.length === 0) {
    await CartModel.findOneAndDelete({ email });
    return null;
  }

  await phone.save();
  await cart.save();
  return cart;
};

const removeCartItem = async (email: string, productId: string) => {
  const cart = await CartModel.findOne({ email });
  const phone = await PhoneModel.findById(productId);

  if (!cart) throw new Error('Cart not found');
  if (!phone) throw new Error('Phone not found');

  let removedItemQuantity = 0;

  cart.items = cart.items.filter((item) => {
    if (item.product.toString() === productId) {
      removedItemQuantity = item.quantity;
      return false;
    }
    return true;
  });

  if (removedItemQuantity > 0) {
    phone.quantity += removedItemQuantity;
    await phone.save();
  }
  if (cart.items.length === 0) {
    await CartModel.findOneAndDelete({ email });
    return null;
  }

  await cart.save();
  return cart;
};

const clearCart = async (email: string) => {
  await CartModel.findOneAndDelete({ email });
};

export const CartServices = {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
  getUserCart,
  clearCart,
};
