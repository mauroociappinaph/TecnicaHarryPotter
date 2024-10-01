import express from 'express';
const router = express.Router();
import { register, login, perfil } from '../../controllers/user/userControllers';


router.post('/', register)
    .get('/login', login)
    .get('/perfil', perfil)

export default router