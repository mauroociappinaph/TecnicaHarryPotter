import express from 'express';
const router = express.Router();
import { register, perfil, getAllUsers, confirmar, autenticar } from '../../controllers/user/userControllers';
import checkAuth from '../../../middleware/authMiddleware';


//? Rutas Publicas
router
    .get('/confirmar/:token', confirmar)
    .get('/allusers', getAllUsers)


router
    .post('/', register)
    .post('/login', autenticar)


//? Rutas Privadas
router
    .get('/perfil', checkAuth, perfil)


export default router