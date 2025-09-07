import express from 'express'
import auth from '../../app/middleware/auth'
import { USER_ROLE } from '../User/user.constant'
import validateRequest from '../../app/middleware/validateRequest'
import { PhoneValidation } from './phone.validation'
import { PhoneControllers } from './phone.controller'

const router = express.Router()


// will call controller func
router.post('/', 
    auth(USER_ROLE.admin),
    validateRequest(PhoneValidation.createPhoneValidationSchema),
    PhoneControllers.createPhone)

router.get('/',PhoneControllers.getAllPhone)

router.get('/:phoneId', PhoneControllers.getSinglePhone)

router.put('/:phoneId', PhoneControllers.updateSinglePhone)

router.delete('/:phoneId', PhoneControllers.deleteSinglePhone)

export const PhoneRoutes = router;