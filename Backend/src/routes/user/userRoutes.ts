import express from 'express';
const router = express.Router();
import { register, perfil, getAllUsers, confirmar, autenticar } from '../../controllers/user/userControllers';



router
    .get('/confirmar/:token', confirmar)
    .get('/perfil', perfil)
    .get('/allusers', getAllUsers)


router
    .post('/', register)
    .post('/login', autenticar)



export default router