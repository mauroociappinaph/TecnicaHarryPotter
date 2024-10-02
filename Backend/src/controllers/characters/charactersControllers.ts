import { Request, Response } from 'express';
import Characters from '../../models/Characters'
import axios from 'axios';
import mongoose from 'mongoose';


const URLAPI = 'https://hp-api.onrender.com/api/characters';

export const getAllCharacters = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get(URLAPI);
        const externalCharacters = response.data;
        const localCharacters = await Characters.find({});
        const allCharacters = [...externalCharacters, ...localCharacters];

        res.json(allCharacters);
    } catch (error) {
        console.error('Error al obtener los personajes:', error);
        res.status(500).json({ msg: 'Error al obtener los personajes' });
    }
};





export const createCharacter = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, role, house, species, wizard, patronus, hogwartsStudent, hogwartsStaff, alive, image } = req.body;
        if (!name || !role || !house || !species || !wizard || !patronus || !hogwartsStudent || !hogwartsStaff || !alive || !image) {
            res.status(400).json({ msg: 'Por favor, introduce todos los campos necesarios para crear un personaje.' });
            return;
        }

        if (typeof wizard !== 'boolean' || typeof hogwartsStudent !== 'boolean' || typeof hogwartsStaff !== 'boolean' || typeof alive !== 'boolean') {
            res.status(400).json({ msg: 'Los campos booleanos deben ser true o false.' });
            return;
        }



        const character = new Characters({ name, role, house, species, wizard, patronus, hogwartsStudent, hogwartsStaff, alive, image });
        await character.save();

        res.status(201).json(character);
    } catch (error) {
        console.error('Error al crear el personaje:', error);
        res.status(500).json({ msg: 'Error al crear el personaje' });
    }
};




export const getCharacterById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ msg: 'El id del personaje es obligatorio' });
        return;
    }

    try {
        // Comprueba si el id es un ObjectId de Mongoose
        const isObjectId = mongoose.Types.ObjectId.isValid(id);

        // Realiza la búsqueda sin usar $or
        let character;
        if (isObjectId) {
            character = await Characters.findById(id);
        } else {
            character = await Characters.findOne({ id });
        }

        if (!character) {
            const response = await axios.get(`${URLAPI}/${id}`).catch((error) => {
                console.error('Error al obtener el personaje:', error);
                res.status(500).json({ msg: 'Error al obtener el personaje' });
                return null;
            });

            if (!response || !response.data) {
                res.status(404).json({ msg: 'Personaje no encontrado' });
                return;
            }

            const newCharacter = new Characters(response.data);
            await newCharacter.save().catch((error) => {
                console.error('Error al guardar el personaje:', error);
                res.status(500).json({ msg: 'Error al guardar el personaje' });
            });
        }

        res.json(character);
    } catch (error) {
        console.error('Error al obtener el personaje:', error);
        res.status(500).json({ msg: 'Error al obtener el personaje' });
    }
};