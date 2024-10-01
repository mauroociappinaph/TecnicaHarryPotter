import { Request, Response } from 'express';
import axios from 'axios';

const URLAPI = 'https://hp-api.onrender.com/api/characters';

export const getAllCharacters = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get(URLAPI);
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener los personajes:', error);
        res.status(500).json({ msg: 'Error al obtener los personajes' });
    }
};


export const createCharacter = (req: Request, res: Response): void => {
    res.json({ msg: 'Desde Crear Characters' });
}