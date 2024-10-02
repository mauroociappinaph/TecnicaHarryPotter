import express from 'express';
const router = express.Router();
import { register, login, perfil, getAllUsers, confirmar } from '../../controllers/user/userControllers';



router
    .get('/login', login)
    .get('/confirmar/:token', confirmar)
    .get('/perfil', perfil)
    .get('/allusers', getAllUsers)


router
    .post('/', register)



export default router