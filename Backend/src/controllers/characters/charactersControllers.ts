import { Request, Response } from 'express';
import Characters from '../../models/Characters'
import axios from 'axios';
import mongoose from 'mongoose';





const URLAPI = 'https://hp-api.onrender.com/api/characters';

export const getAllCharacters = async (req: Request, res: Response): Promise<void> => {
    try {

        const allCharacters = await Characters.find({});


        if (allCharacters.length > 0) {
            res.json(allCharacters);
            return
        }


        const response = await axios.get(URLAPI);
        const externalCharacters = response.data;


        for (const characterData of externalCharacters) {
            const character = new Characters(characterData);
            await character.save();
        }


        const savedCharacters = await Characters.find({});
        res.json(savedCharacters);

    } catch (error) {
        console.error('Error al obtener y guardar los personajes:', error);
        res.status(500).json({ msg: 'Error al obtener y guardar los personajes' });
    }
};



export const createCharacter = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, role, house, species, wizard, patronus, hogwartsStudent, hogwartsStaff, alive, image } = req.body;


        if (!name) {
            res.status(400).json({ msg: 'El nombre es obligatorio para crear un personaje.' });
            return;
        }

        // Verificar que los campos booleanos sean realmente booleanos si se proporcionan (opcional)
        if (wizard !== undefined && typeof wizard !== 'boolean') {
            res.status(400).json({ msg: 'El campo "wizard" debe ser true o false.' });
            return;
        }
        if (hogwartsStudent !== undefined && typeof hogwartsStudent !== 'boolean') {
            res.status(400).json({ msg: 'El campo "hogwartsStudent" debe ser true o false.' });
            return;
        }
        if (hogwartsStaff !== undefined && typeof hogwartsStaff !== 'boolean') {
            res.status(400).json({ msg: 'El campo "hogwartsStaff" debe ser true o false.' });
            return;
        }
        if (alive !== undefined && typeof alive !== 'boolean') {
            res.status(400).json({ msg: 'El campo "alive" debe ser true o false.' });
            return;
        }


        const character = new Characters({
            name,
            role: role || "",
            house: house || "",
            species: species || "",
            wizard: wizard || false,
            patronus: patronus || "",
            hogwartsStudent: hogwartsStudent || false,
            hogwartsStaff: hogwartsStaff || false,
            alive: alive || true,
            image: image || "",
        });


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
        const isObjectId = mongoose.Types.ObjectId.isValid(id);
        let character;

        if (isObjectId) {
            character = await Characters.findById(id);
        } else {
            character = await Characters.findOne({ id });
        }

        if (!character) {

            const response = await axios.get(`${URLAPI}/${id}`).catch((error) => {
                console.error('Error al obtener el personaje de la API externa:', error.message);
                res.status(404).json({ msg: 'Personaje no encontrado' });
                return null;
            });

            if (!response || !response.data) {

                res.status(404).json({ msg: 'El personaje con este ID no existe' });
                return;
            }


            const newCharacter = new Characters(response.data);
            await newCharacter.save().catch((error) => {
                console.error('Error al guardar el personaje en la base de datos:', error.message);
                res.status(500).json({ msg: 'Error al guardar el personaje' });
                return;
            });


            res.json(newCharacter);
        } else {

            res.json(character);
        }

    } catch (error) {

        console.error('Error al obtener el personaje:');
        res.status(500).json({ msg: 'Error interno del servidor al obtener el personaje' });
    }
};
export const deleteCharacter = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ msg: 'El id del personaje es obligatorio' });
        return;
    }
    try {
        const character = await Characters.findByIdAndDelete(id);
        if (!character) {
            res.status(404).json({ msg: 'Personaje no encontrado' });
            return;
        }
        res.json({ msg: 'Personaje eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el personaje:', error);
        res.status(500).json({ msg: 'Error al eliminar el personaje' });
    }
};



export const updateCharacter = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ msg: 'El id del personaje es obligatorio' });
        return;
    }

    try {
        const character = await Characters.findById(id);
        if (!character) {
            res.status(404).json({ msg: 'Personaje no encontrado' });
            return;
        }

        // Actualiza solo los campos que se han proporcionado en la solicitud
        character.name = req.body.name || character.name;
        character.role = req.body.role || character.role;
        character.house = req.body.house || character.house;
        character.species = req.body.species || character.species;
        character.wizard = req.body.wizard !== undefined ? req.body.wizard : character.wizard; // Verificamos si se proporciona
        character.patronus = req.body.patronus || character.patronus;
        character.hogwartsStudent = req.body.hogwartsStudent !== undefined ? req.body.hogwartsStudent : character.hogwartsStudent; // Verificamos si se proporciona
        character.hogwartsStaff = req.body.hogwartsStaff !== undefined ? req.body.hogwartsStaff : character.hogwartsStaff; // Verificamos si se proporciona
        character.alive = req.body.alive !== undefined ? req.body.alive : character.alive; // Verificamos si se proporciona

        // Reemplaza la URL de la imagen con la nueva URL de Cloudinary
        if (req.body.image) {
            character.image = req.body.image; // Actualizamos la imagen con la nueva URL
        }

        await character.save(); // Guarda los cambios en la base de datos
        res.json(character); // Retorna el personaje actualizado
    } catch (error) {
        console.error('Error al actualizar el personaje:', error);
        res.status(500).json({ msg: 'Error al actualizar el personaje' });
    }
};