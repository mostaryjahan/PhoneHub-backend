import { Request, Response } from 'express';
import { CartServices } from './Cart.Service';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';


const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, email } = req.body;
  const result = await CartServices.addToCart( email, productId);
  
  // send response
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Cart created successfully',
    data: result,
  });
  } catch (error:any) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST, // Or another relevant error code
      success: false,
      message: error.message, // Send the error message from CartServices
      data: null,
  });
  }
};

const getUserCart = async (req: Request, res: Response) => {
  
  const {email} =req.params;
  const cart = await CartServices.getUserCart(email);
  sendResponse(res, {
          statusCode: httpStatus.OK,
          success:true,
          message:"Cart Retrieved successfully",
          data: cart,
      });

};

const increaseQuantity = async (req: Request, res: Response) => {
  try {
    const { email, productId } = req.params;
    const result = await CartServices.increaseQuantity(email, productId);
    // send response
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product quantity increased',
    data: result,
  })
  } catch (error:any) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
      data: null,
  });
  }
};

const decreaseQuantity = async (req: Request, res: Response) => {
  try {
    const { email, productId } = req.params;
    const result = await CartServices.decreaseQuantity(email, productId);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Product quantity decreased',
      data: result,
    })
  } catch (error:any) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
      data: null,
  });
  }
};

const removeCartItem = async (req: Request, res: Response) => {
  try {
    const { email, productId } = req.params;
    const result = await CartServices.removeCartItem(email, productId);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Product removed from cart',
      data: result,
    })
  } catch (error:any) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
      data: null,
  });
  }
};
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
