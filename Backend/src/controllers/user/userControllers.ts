import { Request, Response } from 'express';
import User from '../../models/User'



export const register = async (req: Request, res: Response): Promise<void> => {
    const { name: userName, email: userEmail, password: userPassword } = req.body;

    if (!userName || !userEmail || !userPassword) {
        res.status(400).json({
            msg: 'Por favor, introduce todos los campos necesarios para registrar un usuario.',
        });
        return;
    }

    try {
        const existingUser = await User.findOne({ email: userEmail }, 'name email password').exec();

        if (existingUser) {
            res.status(400).json({
                msg: 'El usuario ya existe. Por favor, introduce otro email.',
            });
            return; // Aquí también puedes usar return sin valor
        }

        const newUser = new User({ name: userName, email: userEmail, password: userPassword });

        await newUser.save();

        res.json({ msg: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar el usuario.' });
    }
};



export const login = (req: Request, res: Response): void => {
    res.json({ msg: 'Desde User Login' });
}

export const perfil = (req: Request, res: Response): void => {
    res.json({ msg: 'Desde User Perfil' });
}