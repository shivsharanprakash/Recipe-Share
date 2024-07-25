import express from 'express';
import { getCuisine } from '../controller/CusineController.js';
const router = express.Router();
router.get("/", getCuisine);

export default router;
