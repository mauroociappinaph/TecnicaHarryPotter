"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCharacter = exports.deleteCharacter = exports.getCharacterById = exports.createCharacter = exports.getAllCharacters = void 0;
const Characters_1 = __importDefault(require("../../models/Characters"));
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
const URLAPI = 'https://hp-api.onrender.com/api/characters';
const getAllCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCharacters = yield Characters_1.default.find({});
        if (allCharacters.length > 0) {
            res.json(allCharacters);
            return;
        }
        const response = yield axios_1.default.get(URLAPI);
        const externalCharacters = response.data;
        for (const characterData of externalCharacters) {
            const character = new Characters_1.default(characterData);
            yield character.save();
        }
        const savedCharacters = yield Characters_1.default.find({});
        res.json(savedCharacters);
    }
    catch (error) {
        console.error('Error al obtener y guardar los personajes:', error);
        res.status(500).json({ msg: 'Error al obtener y guardar los personajes' });
    }
});
exports.getAllCharacters = getAllCharacters;
const createCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const character = new Characters_1.default({
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
        yield character.save();
        res.status(201).json(character);
    }
    catch (error) {
        console.error('Error al crear el personaje:', error);
        res.status(500).json({ msg: 'Error al crear el personaje' });
    }
});
exports.createCharacter = createCharacter;
const getCharacterById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ msg: 'El id del personaje es obligatorio' });
        return;
    }
    try {
        const isObjectId = mongoose_1.default.Types.ObjectId.isValid(id);
        let character;
        if (isObjectId) {
            character = yield Characters_1.default.findById(id);
        }
        else {
            character = yield Characters_1.default.findOne({ id });
        }
        if (!character) {
            const response = yield axios_1.default.get(`${URLAPI}/${id}`).catch((error) => {
                console.error('Error al obtener el personaje de la API externa:', error.message);
                res.status(404).json({ msg: 'Personaje no encontrado' });
                return null;
            });
            if (!response || !response.data) {
                res.status(404).json({ msg: 'El personaje con este ID no existe' });
                return;
            }
            const newCharacter = new Characters_1.default(response.data);
            yield newCharacter.save().catch((error) => {
                console.error('Error al guardar el personaje en la base de datos:', error.message);
                res.status(500).json({ msg: 'Error al guardar el personaje' });
                return;
            });
            res.json(newCharacter);
        }
        else {
            res.json(character);
        }
    }
    catch (error) {
        console.error('Error al obtener el personaje:');
        res.status(500).json({ msg: 'Error interno del servidor al obtener el personaje' });
    }
});
exports.getCharacterById = getCharacterById;
const deleteCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ msg: 'El id del personaje es obligatorio' });
        return;
    }
    try {
        const character = yield Characters_1.default.findByIdAndDelete(id);
        if (!character) {
            res.status(404).json({ msg: 'Personaje no encontrado' });
            return;
        }
        res.json({ msg: 'Personaje eliminado correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar el personaje:', error);
        if (!res.headersSent) { // Verifica si no se ha enviado una respuesta
            res.status(500).json({ msg: 'Error al eliminar el personaje' });
        }
    }
});
exports.deleteCharacter = deleteCharacter;
const updateCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ msg: 'El id del personaje es obligatorio' });
        return;
    }
    try {
        const character = yield Characters_1.default.findById(id);
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
        yield character.save(); // Guarda los cambios en la base de datos
        res.json(character); // Retorna el personaje actualizado
    }
    catch (error) {
        console.error('Error al actualizar el personaje:', error);
        res.status(500).json({ msg: 'Error al actualizar el personaje' });
    }
});
exports.updateCharacter = updateCharacter;
