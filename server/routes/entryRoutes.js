import express from 'express';
const router = express.Router();
import { addEntry, getEntries } from '../controllers/entryController.js';
import { validator } from '../middleware/validatorMiddleware.js';
import { addEntrySchema } from '../validators/entryValidators/addEntryValidator.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/addEntry', protect, validator(addEntrySchema), addEntry)
router.get('/getEntries', protect, getEntries)

export default router;