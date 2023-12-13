import express from 'express';
const router = express.Router();
import { validator } from '../middleware/validatorMiddleware.js';
import { addAccount, deleteAccount, getAccount, getAccounts, updateAccount } from '../controllers/accountController.js';
import { addAccountSchema } from '../validators/accountValidators/addAccountValidator.js';
import { protect } from '../middleware/authMiddleware.js';
import checkId from '../middleware/checkId.js';

router.post('/addAccount', protect, validator(addAccountSchema), addAccount)
router.get('/getAccounts', protect, getAccounts)
router.get('/:id', protect, checkId, getAccount)
router.put('/updateAccount', protect, updateAccount)
router.delete('/:id', protect, checkId, deleteAccount)

export default router;