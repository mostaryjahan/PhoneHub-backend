import { Request, Response } from 'express';
import { CartServices } from './Cart.Service';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';


const addToCart = catchAsync(async (req: Request, res: Response) => {
  const { productId, email } = req.body;
  const result = await CartServices.addToCart(email, productId);
  
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Cart created successfully',
    data: result,
  });
});

const getUserCart = catchAsync(async (req: Request, res: Response) => {
  const {email} = req.params;
  const cart = await CartServices.getUserCart(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart Retrieved successfully",
    data: cart,
  });
});

const increaseQuantity = catchAsync(async (req: Request, res: Response) => {
  const { email, productId } = req.params;
  const result = await CartServices.increaseQuantity(email, productId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product quantity increased',
    data: result,
  });
});

const decreaseQuantity = catchAsync(async (req: Request, res: Response) => {
  const { email, productId } = req.params;
  const result = await CartServices.decreaseQuantity(email, productId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product quantity decreased',
    data: result,
  });
});

const removeCartItem = catchAsync(async (req: Request, res: Response) => {
  const { email, productId } = req.params;
  const result = await CartServices.removeCartItem(email, productId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product removed from cart',
    data: result,
  });
});
const clearCart = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  await CartServices.clearCart(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart cleared successfully",
    data: null,
  });
});

export const CartControllers = {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  getUserCart,
  removeCartItem,
  clearCart,
};
