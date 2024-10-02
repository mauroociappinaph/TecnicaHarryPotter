import express from 'express';
const router = express.Router();
import { getAllCharacters, createCharacter, getCharacterById, updateCharacter, deleteCharacter } from '../../controllers/characters/charactersControllers';


router
    .get('/', getAllCharacters)
    .get('/:id', getCharacterById)


router
    .post('/create-character', createCharacter)

router
    .put('/:id', updateCharacter)

router
    .delete('/:id', deleteCharacter);
export default router