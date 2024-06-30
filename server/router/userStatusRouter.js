import express from 'express';
import { getUserStatus } from '../controller/userStatusController.js';

const router = express.Router();

router.get('/:id/status', getUserStatus);

export default router;
