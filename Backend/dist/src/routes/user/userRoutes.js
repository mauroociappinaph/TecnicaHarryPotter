"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userControllers_1 = require("../../controllers/user/userControllers");
const authMiddleware_1 = __importDefault(require("../../../middleware/authMiddleware"));
//? Rutas Publicas
/**
 * @swagger
 * /api/user/confirmar/{token}:
 *   get:
 *     tags: [Users]
 *     summary: Confirmar cuenta
 *     description: Confirma una cuenta de usuario utilizando un token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token para confirmar la cuenta.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cuenta confirmada con éxito.
 *       400:
 *         description: Token inválido o cuenta ya confirmada.
 */
router
    .get('/confirmar/:token', userControllers_1.confirmar)
    /**
     * @swagger
     * /api/user/allusers:
     *   get:
     *     tags: [Users]
     *     summary: Obtener todos los usuarios
     *     description: Retorna una lista de todos los usuarios registrados.
     *     responses:
     *       200:
     *         description: Lista de usuarios.
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
     *                   email:
     *                     type: string
     *       500:
     *         description: Error al obtener los usuarios.
     */
    .get('/allusers', userControllers_1.getAllUsers);
/**
 * @swagger
 * /api/user/olvide-password/{token}:
 *   get:
 *     tags: [Users]
 *     summary: Olvidar Password
 *     description: Envía un email con un enlace para recuperar la contraseña.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token para olvidar la contraseña.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email enviado con el enlace de recuperación de la contraseña.
 *       500:
 *         description: Error al enviar el email.
 */
router.route("/olvide-password/:token").get(userControllers_1.comprobarToken).post(userControllers_1.nuevoPassword);
/**
 * @swagger
 * /api/user:
 *   post:
 *     tags: [Users]
 *     summary: Registro de usuario
 *     description: Registra un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *       400:
 *         description: Datos inválidos.
 */
router.post('/', userControllers_1.register);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags: [Users]
 *     summary: Inicio de sesión
 *     description: Inicia sesión en la cuenta de usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       401:
 *         description: Credenciales inválidas.
 */
router.post('/login', userControllers_1.autenticar);
/**
 * @swagger
 * /api/user/olvide-password:
 *   post:
 *     tags: [Users]
 *     summary: Recuperación de contraseña
 *     description: Envía un correo electrónico con un enlace para recuperar la contraseña del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario para la recuperación de contraseña.
 *     responses:
 *       200:
 *         description: Correo enviado para recuperación de contraseña.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error al enviar el correo electrónico.
 */
router.post('/olvide-password', userControllers_1.olvidePassword);
//? Rutas Privadas
/**
 * @swagger
 * /api/user/perfil:
 *   get:
 *     tags: [Users]
 *     summary: Obtener perfil de usuario
 *     description: Obtiene el perfil del usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil de usuario.
 *       401:
 *         description: No autorizado.
 */
router.get('/perfil', authMiddleware_1.default, userControllers_1.perfil);
/**
 * @swagger
 * /api/user/perfil/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Actualizar perfil de usuario
 *     description: Actualiza la información del perfil del usuario.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado con éxito.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 */
router.put("/perfil/:id", authMiddleware_1.default, userControllers_1.actualizarPerfil);
/**
* @swagger
* /api/user/actualizar-password:
*   put:
*     tags: [Users]
*     summary: Actualizar contraseña
*     description: Cambia la contraseña del usuario autenticado.
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               oldPassword:
*                 type: string
*               newPassword:
*                 type: string
*     responses:
*       200:
*         description: Contraseña actualizada con éxito.
*       401:
*         description: No autorizado.
*       400:
*         description: Datos inválidos.
*/
router.put("/actualizar-password", authMiddleware_1.default, userControllers_1.actualizarPassword);
exports.default = router;
