import express from 'express';
import { MagiccardsController } from '../controller/magiccards.controller';

export const router = express.Router()

//get scrifall data
router.post('/search', MagiccardsController.getMagiccards)