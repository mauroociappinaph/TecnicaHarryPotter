
import { Request, Response } from 'express';
import User from '../../models/User'
import { AuthenticatedRequest } from '../../../middleware/authMiddleware'
import generarJWT from '../../../helpers/generarJWT';
import emailRegistro from '../../../helpers/emailRegistro';
import emailOlvidePassword from '../../../helpers/emailOlvidePassword';




export const register = async (req: Request, res: Response): Promise<void> => {
    const { name: userName, email: userEmail, password: userPassword } = req.body;

    if (!userName || !userEmail || !userPassword) {
        res.status(400).json({
            msg: 'Por favor, introduce todos los campos necesarios para registrar un usuario.',
        });
        return;
    }

    try {
        const existingUser = await User.findOne({ email: userEmail }).exec();

        if (existingUser) {
            res.status(400).json({
                msg: 'El usuario ya existe. Por favor, introduce otro email.',
            });
            return;
        }

        const token = generarJWT(userEmail); // Generar el token
        const newUser = new User({ name: userName, email: userEmail, password: userPassword, token });

        const UserGuardado = await newUser.save();

        if (!UserGuardado) {
            throw new Error('Error al guardar el usuario');
        }


        await emailRegistro({
            email: userEmail,
            nombre: userName,
            token: UserGuardado.token || ''
        });

        res.json({ msg: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar el usuario.' });
    }
};

export const confirmar = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params;

    try {
        const usuarioConfirmado = await User.findOne({ token });

        if (!usuarioConfirmado) {
            res.status(400).json({ msg: 'Token no válido' });
            return;
        }

        if (!usuarioConfirmado.token) {
            throw new Error('El usuario ya ha sido confirmado anteriormente.');
        }

        usuarioConfirmado.token = ''; // Invalidar el token
        usuarioConfirmado.confirmado = true; // Marcar como confirmado

        await usuarioConfirmado.save(); // Guardar los cambios

        res.json({ msg: 'Usuario confirmado correctamente' });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error al confirmar el usuario: ", error.message);
            res.status(400).json({ msg: error.message });
        } else {
            console.error("Error desconocido al confirmar el usuario: ", error);
            res.status(500).json({ msg: 'Error al confirmar el usuario.' });
        }
    }
};

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


export const olvidePassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("El usuario no existe");
            res.status(404).json({ msg: error.message });
            return;
        }
        if (user.token) {
            const error = new Error("El usuario ya tiene un token");
            res.status(403).json({ msg: error.message });
            return;
        }
        user.token = generarJWT(user.id);
        await user.save();


        emailOlvidePassword({ email, nombre: user.name, token: user.token });




        res.json({ msg: 'Hemos enviado un email con las instrucciones' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al olvidar el password' });
    }
};


export const comprobarToken = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params;

    const tokenValido = await User.findOne({ token });

    if (tokenValido) {

        res.json({ msg: "Token válido y el usuario existe" });
    } else {
        const error = new Error("Token no válido");
        res.status(400).json({ msg: error.message });
        return
    }
};


export const nuevoPassword = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ token });


    if (!user) {
        const error = new Error("Hubo un error. Usuario no encontrado.");
        res.status(400).json({ msg: error.message });
        return;
    }


    if (!password) {
        const error = new Error("El password es obligatorio");
        res.status(400).json({ msg: error.message });
        return;
    }

    try {

        user.token = "";
        user.password = password;
        await user.save();

        res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al modificar el password' });
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