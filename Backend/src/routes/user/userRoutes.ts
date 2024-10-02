import express from 'express';
const router = express.Router();
import { register, login, perfil, getAllUsers } from '../../controllers/user/userControllers';


router.post('/', register)
    .get('/login', login)
    .get('/perfil', perfil)
    .get('/allusers', getAllUsers);

export default router