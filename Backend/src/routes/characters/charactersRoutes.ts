import express from 'express';
const router = express.Router();
import { getAllCharacters, createCharacter, getCharacterById, updateCharacter, deleteCharacter } from '../../controllers/characters/charactersControllers';

/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: Operaciones sobre personajes
 */

/**
 * @swagger
 * /api/characters:
 *   get:
 *     tags: [Characters]
 *     summary: Obtener todos los personajes
 *     description: Retorna una lista de todos los personajes.
 *     responses:
 *       200:
 *         description: Lista de personajes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   role:
 *                     type: string
 *                   house:
 *                     type: string
 *                   species:
 *                     type: string
 *                   wizard:
 *                     type: boolean
 *                   patronus:
 *                     type: string
 *                   hogwartsStudent:
 *                     type: boolean
 *                   hogwartsStaff:
 *                     type: boolean
 *                   alive:
 *                     type: boolean
 *                   image:
 *                     type: string
 *       500:
 *         description: Error al obtener los personajes.
 */
router.get('/', getAllCharacters);

/**
 * @swagger
 * /api/characters/{id}:
 *   get:
 *     tags: [Characters]
 *     summary: Obtener personaje por ID
 *     description: Retorna un personaje específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del personaje a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Personaje encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 role:
 *                   type: string
 *                 house:
 *                   type: string
 *                 species:
 *                   type: string
 *                 wizard:
 *                   type: boolean
 *                 patronus:
 *                   type: string
 *                 hogwartsStudent:
 *                   type: boolean
 *                 hogwartsStaff:
 *                   type: boolean
 *                 alive:
 *                   type: boolean
 *                 image:
 *                   type: string
 *       404:
 *         description: Personaje no encontrado.
 *       500:
 *         description: Error al obtener el personaje.
 */
router.get('/:id', getCharacterById);

/**
 * @swagger
 * /api/characters/create-character:
 *   post:
 *     tags: [Characters]
 *     summary: Crear un nuevo personaje
 *     description: Crea un nuevo personaje en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               house:
 *                 type: string
 *               species:
 *                 type: string
 *               wizard:
 *                 type: boolean
 *               patronus:
 *                 type: string
 *               hogwartsStudent:
 *                 type: boolean
 *               hogwartsStaff:
 *                 type: boolean
 *               alive:
 *                 type: boolean
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Personaje creado con éxito.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error al crear el personaje.
 */
router.post('/create-character', createCharacter);

/**
 * @swagger
 * /api/characters/{id}:
 *   put:
 *     tags: [Characters]
 *     summary: Actualizar personaje
 *     description: Actualiza la información de un personaje existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del personaje a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               house:
 *                 type: string
 *               species:
 *                 type: string
 *               wizard:
 *                 type: boolean
 *               patronus:
 *                 type: string
 *               hogwartsStudent:
 *                 type: boolean
 *               hogwartsStaff:
 *                 type: boolean
 *               alive:
 *                 type: boolean
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Personaje actualizado con éxito.
 *       400:
 *         description: Datos inválidos.
 *       404:
 *         description: Personaje no encontrado.
 *       500:
 *         description: Error al actualizar el personaje.
 */
router.put('/:id', updateCharacter);

/**
 * @swagger
 * /api/characters/{id}:
 *   delete:
 *     tags: [Characters]
 *     summary: Eliminar personaje
 *     description: Elimina un personaje del sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del personaje a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Personaje eliminado con éxito.
 *       404:
 *         description: Personaje no encontrado.
 *       500:
 *         description: Error al eliminar el personaje.
 */
router.delete('/:id', deleteCharacter);

export default router;