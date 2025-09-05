import { Router } from "express";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "./user.constant";
import validateRequest from "../../app/middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";


const router = Router();

router.post(
  '/block-user/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeBlockValidationSchema),
  UserController.blockUser,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.user),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);

router.patch(
  '/update-profile/:userId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.updateProfileValidationSchema),
  UserController.updateProfile,
);

router.patch(
  '/update-profile-photo/:userId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.updatePhotoValidationSchema),
  UserController.updateProfilePhoto,
);
router.get(
  '/:userEmail',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getSingleUser,
);
router.get('/', auth(USER_ROLE.admin), UserController.getAllUsers);

export const UserRoutes = router;
