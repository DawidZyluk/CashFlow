import express from 'express';
const router = express.Router();
import { login, getUserProfile, logoutUser, register, requestPasswordReset, resetPassword, updateUserProfile, verifyAccount, requestVerifyAccount, deleteProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validator } from '../middleware/validatorMiddleware.js';
import { loginSchema } from '../validators/userValidators/loginValidator.js';
import { registerSchema } from '../validators/userValidators/registerValidator.js';
import { updateSchema } from '../validators/userValidators/updateSchema.js';
import { resetRequestSchema } from '../validators/userValidators/resetValidator.js';
import { passwordResetSchema } from '../validators/userValidators/passwordResetValidator.js';
import { createAccountLimiter, loginLimiter } from '../middleware/limiters.js';

router.post('/register', validator(registerSchema), createAccountLimiter, register)
router.post('/login', validator(loginSchema), loginLimiter, login)
router.post('/requestReset', validator(resetRequestSchema), requestPasswordReset)
router.post('/resetPassword', validator(passwordResetSchema), resetPassword)
router.post('/logout', logoutUser)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, validator(updateSchema), updateUserProfile)
router.delete('/profile', protect, deleteProfile)
router.post('/verifyAccount', protect, verifyAccount)
router.post('/requestVerifyAccount', protect, requestVerifyAccount)

export default router;