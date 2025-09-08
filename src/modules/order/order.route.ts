import express from "express";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "../User/user.constant";
import { orderController } from "./order.controller";

const router = express.Router();

// Specific routes first
router.get("/verify", auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.vendor), orderController.verifyPayment);
router.get("/by-email/:email", auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.vendor), orderController.getOrderByEmail);
router.patch("/:id/status", auth(USER_ROLE.admin, USER_ROLE.vendor), orderController.updateOrderStatus);
router.delete("/:id", auth(USER_ROLE.admin, USER_ROLE.vendor), orderController.deleteOrder);

// General routes last
router.post("/",auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.vendor), orderController.createOrder);
router.get("/", auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.vendor), orderController.getOrders);

export const OrderRoutes = router;
