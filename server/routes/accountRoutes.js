import express from 'express';
const router = express.Router();
import { validator } from '../middleware/validatorMiddleware.js';
import { addAccount, getAccounts } from '../controllers/accountController.js';
import { addAccountSchema } from '../validators/accountValidators.js/addAccountValidator.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/addAccount', protect, validator(addAccountSchema), addAccount)
router.get('/getAccounts', protect, getAccounts)

export default router;