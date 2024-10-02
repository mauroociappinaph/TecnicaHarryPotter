import express from 'express';
const router = express.Router();
import { register, perfil, getAllUsers, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../../controllers/user/userControllers';
import checkAuth from '../../../middleware/authMiddleware';


//? Rutas Publicas
router
    .get('/confirmar/:token', confirmar)
    .get('/allusers', getAllUsers)

router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router
    .post('/', register)
    .post('/login', autenticar)
    .post('/olvide-password', olvidePassword)


//? Rutas Privadas
router
    .get('/perfil', checkAuth, perfil)


export default router