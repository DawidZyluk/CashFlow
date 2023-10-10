import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { getStats } from '../controllers/statsController.js';

router.get('/getStats', protect, getStats)

export default router;