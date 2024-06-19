import express from 'express';
import { createImg } from '../controllers/createImgController.js';

const router = express.Router();
router.post("/createImg", createImg);

export default router;