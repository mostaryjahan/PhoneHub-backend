import { Router } from "express";
import { USER_ROLE } from "../User/user.constant";
import auth from "../../app/middleware/auth";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../app/middleware/validateRequest";
import { AuthValidations } from "./authValidation";


const router = Router();

router.post(
  '/logout',
  auth(USER_ROLE.admin, USER_ROLE.user),
  AuthControllers.logoutUser,
);

router.post(
  '/register',
  validateRequest(AuthValidations.registerUserValidationSchema),
  AuthControllers.registerUser,
);

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);


export const AuthRoutes = router;
