import express from 'express';
const router = express.Router();
import { addEntry } from '../controllers/entryController.js';
import { validator } from '../middleware/validatorMiddleware.js';
import { addEntrySchema } from '../validators/entriesValidators/addEntryValidator.js';

router.post('/addEntry', validator(addEntrySchema), addEntry)

export default router;