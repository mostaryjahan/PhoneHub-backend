import { Router } from "express";
import { UserRoutes } from "../../modules/User/user.route";
import { OrderRoutes } from "../../modules/order/order.route";
import { CartRoutes } from "../../modules/Cart/Cart.route";
import { AuthRoutes } from "../../modules/Auth/auth.route";
import { PhoneRoutes } from "../../modules/phone/phone.route";

const router = Router();

const moduleRoutes =[
    {
        path: '/auth',
        route:AuthRoutes
    },
    {
        path: '/users',
        route:UserRoutes
    },
    {
        path:'/phones',
        route:PhoneRoutes,
    },
    {
        path:'/order',
        route: OrderRoutes
    },
    {
        path:'/cart',
        route:CartRoutes,
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;