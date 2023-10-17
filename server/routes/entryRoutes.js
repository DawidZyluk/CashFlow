import express from 'express';
const router = express.Router();
import { addEntry, deleteEntry, getEntries, getEntry, updateEntry } from '../controllers/entryController.js';
import { validator } from '../middleware/validatorMiddleware.js';
import { addEntrySchema } from '../validators/entryValidators/addEntryValidator.js';
import { protect } from '../middleware/authMiddleware.js';
import checkId from '../middleware/checkId.js';

router.post('/addEntry', protect, validator(addEntrySchema), addEntry)
router.get('/getEntries', protect, getEntries)
router.get('/:id', protect, checkId, getEntry)
router.put('/updateEntry', protect, updateEntry)
router.delete('/:id', protect, checkId, deleteEntry)

export default router;