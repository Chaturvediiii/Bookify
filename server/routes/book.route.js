import express from 'express'
import { createBook } from '../controllers/book.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router()

router.post('/create',verifyUser,createBook)

export default router;