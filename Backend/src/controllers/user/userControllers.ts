
import { Request, Response } from 'express';
import User from '../../models/User'
import { AuthenticatedRequest } from '../../../middleware/authMiddleware'
import generarJWT from '../../../helpers/generarJWT';



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

export const confirmar = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params;
    console.log(req.params.token);

    const usuarioConfirmado = await User.findOne({ token });

    if (!usuarioConfirmado) {
        const error = new Error('Token no valido');
        res.status(404).json({ msg: error.message });
        return

    }
    console.log(usuarioConfirmado);

    try {

        usuarioConfirmado.token = " ";
        usuarioConfirmado.confirmado = true;
        await usuarioConfirmado.save();

        res.json({ msg: 'Usuario confirmado correctamente' });
    } catch (error) {
        console.log(error);
    }

}

export const autenticar = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Comprobar si el usuario existe
        const usuario = await User.findOne({ email });
        if (!usuario) {
            const error = new Error("El Usuario no existe");
            res.status(404).json({ msg: error.message });
            return;
        }

        // Comprobar si el usuario está confirmado
        if (!usuario.confirmado) {
            const error = new Error("Tu Cuenta no ha sido confirmada");
            res.status(403).json({ msg: error.message });
            return;
        }

        // Comprobar la contraseña
        if (await usuario.comprobarPassword(password)) {
            res.json({
                _id: usuario._id,
                nombre: usuario.name,
                email: usuario.email,
                token: generarJWT(usuario.id),
            });
        } else {
            const error = new Error("El Password es incorrecto");
            res.status(403).json({ msg: error.message });
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en la autenticación' });
    }
};





export const perfil = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { user } = req;
    if (!user) {
        const error = new Error("No se ha proporcionado un usuario");
        res.status(400).json({ msg: error.message });
        return;
    }
    try {
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el perfil' });
    }
};



export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await User.find();
        res.json(response);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ msg: 'Error al obtener los usuarios' });
    }
};