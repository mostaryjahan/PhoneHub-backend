import AppError from '../../app/errors/AppError';
import { PhoneModel } from '../phone/phone.model';
import httpStatus from 'http-status';
import Order from './order.model';
import { orderUtils } from './order.utils';
import { JwtPayload } from 'jsonwebtoken';

const createOrder = async (
  user: JwtPayload,
  payload: { phones: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  if (!payload?.phones?.length)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');

  const phones = payload.phones;

  let totalPrice = 0;
  const phoneDetails = await Promise.all(
    phones.map(async (item) => {
      const phone = await PhoneModel.findById(item.product);
      if (phone) {
        const subtotal = phone ? (phone.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );

  let order = await Order.create({
    userEmail: user.email,
    products: phoneDetails,
    totalPrice,
  });

  // payment integration
  const shurjoPayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: 'N/A',
    customer_email: user.email,
    customer_phone: 'N/A',
    customer_city: 'N/A',
    client_ip,
    return_url: process.env.SP_RETURN_URL,
  };
  // console.log(shurjoPayPayload);

  const payment = await orderUtils.makePaymentAsync(shurjoPayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }
  return payment.checkout_url;
};

const getOrders = async () => {
  const data = await Order.find()
    .populate({
      path: 'products.product',
      model: 'Phone'
    })
    .lean();
  
  // Manually populate user data based on userEmail
  const { User } = await import('../User/user.model');
  const ordersWithUsers = await Promise.all(
    data.map(async (order) => {
      const user = await User.findOne({ email: order.userEmail }).select('name email');
      return {
        ...order,
        user: user || { name: 'Unknown User', email: order.userEmail }
      };
    })
  );
  
  return ordersWithUsers;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }
  return verifiedPayment;
};

const getOrderByEmail = async (email: string) => {
  try {
    const orders = await Order.find({ userEmail: email });
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch orders');
  }
};

const updateOrderStatus = async (orderId: string, status: string) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }
  
  return order;
};

const deleteOrder = async (orderId: string) => {
  const order = await Order.findByIdAndDelete(orderId);
  
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }
  
  return order;
};

export const orderService = {
  createOrder,
  getOrders,
  verifyPayment,
  getOrderByEmail,
  updateOrderStatus,
  deleteOrder,
};
