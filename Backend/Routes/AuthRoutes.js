import express from 'express';
import { getAuthor } from '../controller/Authcontroller.js'
const router =express.Router();

router.get("/",getAuthor);

export default router;