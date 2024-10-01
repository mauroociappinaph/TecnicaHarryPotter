import express from 'express';
const router = express.Router();
import { getAllCharacters, createCharacter } from '../../controllers/characters/charactersControllers';


router.get('/', getAllCharacters)
    .post('/create-character', createCharacter)
export default router