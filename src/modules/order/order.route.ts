import express from "express";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "../User/user.constant";
import { orderController } from "./order.controller";

const router = express.Router();

router.get("/verify", auth(USER_ROLE.user), orderController.verifyPayment);
router.post("/",auth(USER_ROLE.user), orderController.createOrder);
router.get("/", auth(USER_ROLE.user, USER_ROLE.admin), orderController.getOrders);
router.get("/by-email/:email", auth(USER_ROLE.user), orderController.getOrderByEmail);

export const OrderRoutes = router;
