import express from 'express';
import { CartControllers } from './Cart.Controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.get('/by-email/:email',auth(USER_ROLE.user), CartControllers.getUserCart);
router.post('/add', auth(USER_ROLE.user), CartControllers.addToCart); //problem
router.patch('/increase-quantity/:email/:productId', CartControllers.increaseQuantity);
router.patch('/decrease-quantity/:email/:productId', CartControllers.decreaseQuantity);
router.delete('/remove/:email/:productId', CartControllers.removeCartItem);
router.delete('/clear/:email', auth(USER_ROLE.user), CartControllers.clearCart);



export const CartRoutes = router;