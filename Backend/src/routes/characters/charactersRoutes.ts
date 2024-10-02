import express from 'express';
const router = express.Router();
import { getAllCharacters, createCharacter, getCharacterById } from '../../controllers/characters/charactersControllers';


router
    .get('/', getAllCharacters)
    .get('/:id', getCharacterById)

router
    .post('/create-character', createCharacter)
export default router