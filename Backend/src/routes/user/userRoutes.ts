import express from 'express';
const router = express.Router();
import { register, perfil, getAllUsers, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword, actualizarPassword, actualizarPerfil, deleteUserAccount } from '../../controllers/user/userControllers';
import checkAuth from '../../../middleware/authMiddleware';




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
    .get('/confirmar/:token', confirmar)

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
    .get('/allusers', getAllUsers)

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

router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);


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
router.post('/', register)

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

router.post('/login', autenticar)

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
router.post('/olvide-password', olvidePassword)


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
router.get('/perfil', checkAuth, perfil)


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
router.put("/perfil/:id", checkAuth, actualizarPerfil)

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
router.put("/actualizar-password", checkAuth, actualizarPassword);


/**
 * @swagger
 * /api/user/delete/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Eliminar cuenta
 *     description: Elimina la cuenta del usuario autenticado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cuenta eliminada con èxito.
 *       401:
 *         description: No autorizado.
 */
router.delete("/delete/:id", checkAuth, deleteUserAccount)


export default router