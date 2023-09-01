import express from 'express';
const router = express.Router();
import { validator } from '../middleware/validatorMiddleware.js';
import { addAccount } from '../controllers/accountController.js';
import { addAccountSchema } from '../validators/accountValidators.js/addAccountValidator.js';

router.post('/addAccount',  validator(addAccountSchema), addAccount)

export default router;