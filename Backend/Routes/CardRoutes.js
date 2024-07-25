import express from 'express';
import { getCards } from '../controller/Cardcontroller.js';

const router = express.Router();
router.get("/", getCards);


export default router;
