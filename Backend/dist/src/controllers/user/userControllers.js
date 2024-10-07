"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarPassword = exports.actualizarPerfil = exports.getAllUsers = exports.nuevoPassword = exports.comprobarToken = exports.olvidePassword = exports.perfil = exports.autenticar = exports.confirmar = exports.register = void 0;
const User_1 = __importDefault(require("../../models/User"));
const generarJWT_1 = __importDefault(require("../../../helpers/generarJWT"));
const emailRegistro_1 = __importDefault(require("../../../helpers/emailRegistro"));
const emailOlvidePassword_1 = __importDefault(require("../../../helpers/emailOlvidePassword"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name: userName, email: userEmail, password: userPassword } = req.body;
    if (!userName || !userEmail || !userPassword) {
        res.status(400).json({
            msg: 'Por favor, introduce todos los campos necesarios para registrar un usuario.',
        });
        return;
    }
    try {
        const existingUser = yield User_1.default.findOne({ email: userEmail }).exec();
        if (existingUser) {
            res.status(400).json({
                msg: 'El usuario ya existe. Por favor, introduce otro email.',
            });
            return;
        }
        const token = (0, generarJWT_1.default)(userEmail); // Generar el token
        const newUser = new User_1.default({ name: userName, email: userEmail, password: userPassword, token });
        const UserGuardado = yield newUser.save();
        if (!UserGuardado) {
            throw new Error('Error al guardar el usuario');
        }
        yield (0, emailRegistro_1.default)({
            email: userEmail,
            nombre: userName,
            token: UserGuardado.token || ''
        });
        res.json({ msg: 'Usuario registrado correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar el usuario.' });
    }
});
exports.register = register;
const confirmar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    try {
        const usuarioConfirmado = yield User_1.default.findOne({ token });
        if (!usuarioConfirmado) {
            res.status(400).json({ msg: 'Token no válido' });
            return;
        }
        if (!usuarioConfirmado.token) {
            throw new Error('El usuario ya ha sido confirmado anteriormente.');
        }
        usuarioConfirmado.token = ''; // Invalidar el token
        usuarioConfirmado.confirmado = true; // Marcar como confirmado
        yield usuarioConfirmado.save(); // Guardar los cambios
        res.json({ msg: 'Usuario confirmado correctamente' });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error al confirmar el usuario: ", error.message);
            res.status(400).json({ msg: error.message });
        }
        else {
            console.error("Error desconocido al confirmar el usuario: ", error);
            res.status(500).json({ msg: 'Error al confirmar el usuario.' });
        }
    }
});
exports.confirmar = confirmar;
const autenticar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Comprobar si el usuario existe
        const usuario = yield User_1.default.findOne({ email });
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
        if (yield usuario.comprobarPassword(password)) {
            res.json({
                _id: usuario._id,
                nombre: usuario.name,
                email: usuario.email,
                token: (0, generarJWT_1.default)(usuario.id),
            });
        }
        else {
            const error = new Error("El Password es incorrecto");
            res.status(403).json({ msg: error.message });
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en la autenticación' });
    }
});
exports.autenticar = autenticar;
const perfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (!user) {
        const error = new Error("No se ha proporcionado un usuario");
        res.status(400).json({ msg: error.message });
        return;
    }
    try {
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el perfil' });
    }
});
exports.perfil = perfil;
const olvidePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
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
        user.token = (0, generarJWT_1.default)(user.id);
        yield user.save();
        (0, emailOlvidePassword_1.default)({ email, nombre: user.name, token: user.token });
        res.json({ msg: 'Hemos enviado un email con las instrucciones' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al olvidar el password' });
    }
});
exports.olvidePassword = olvidePassword;
const comprobarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const tokenValido = yield User_1.default.findOne({ token });
    if (tokenValido) {
        res.json({ msg: "Token válido y el usuario existe" });
    }
    else {
        const error = new Error("Token no válido");
        res.status(400).json({ msg: error.message });
        return;
    }
});
exports.comprobarToken = comprobarToken;
const nuevoPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { password } = req.body;
    const user = yield User_1.default.findOne({ token });
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
        yield user.save();
        res.json({ msg: "Password modificado correctamente" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al modificar el password' });
    }
});
exports.nuevoPassword = nuevoPassword;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield User_1.default.find();
        res.json(response);
    }
    catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ msg: 'Error al obtener los usuarios' });
    }
});
exports.getAllUsers = getAllUsers;
const actualizarPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        const error = new Error("No se ha proporcionado el id del usuario");
        res.status(400).json({ msg: error.message });
        return;
    }
    const user = yield User_1.default.findById(id);
    if (!user) {
        const error = new Error("Hubo un error");
        res.status(400).json({ msg: error.message });
        return;
    }
    const { email } = req.body;
    if (user.email !== req.body.email) {
        const existeEmail = yield User_1.default.findOne({ email });
        if (existeEmail) {
            const error = new Error("Ese email ya esta en uso");
            res.status(400).json({ msg: error.message });
            return;
        }
    }
    try {
        user.name = req.body.nombre;
        user.email = req.body.email;
        const useroActualizado = yield user.save();
        res.json(useroActualizado);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ msg: error.message });
        }
        else {
            console.log("Error desconocido al actualizar el perfil");
            res.status(500).json({ msg: 'Error al actualizar el perfil' });
        }
    }
});
exports.actualizarPerfil = actualizarPerfil;
const actualizarPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user || {}; // Manejar el caso si user es undefined
    const { pwd_actual, pwd_nuevo } = req.body;
    // Comprobar que el usuario existe
    const usuario = yield User_1.default.findById(id).exec();
    if (!usuario) {
        const error = new Error("Hubo un error");
        res.status(400).json({ msg: error.message });
        return;
    }
    try {
        if (!pwd_actual) {
            const error = new Error("El Password Actual es Obligatorio");
            res.status(400).json({ msg: error.message });
            return;
        }
        if (!pwd_nuevo) {
            const error = new Error("El Password Nuevo es Obligatorio");
            res.status(400).json({ msg: error.message });
            return;
        }
        if (pwd_nuevo.length < 6) {
            const error = new Error("El Password Nuevo debe tener al menos 6 caracteres");
            res.status(400).json({ msg: error.message });
            return;
        }
        if (yield usuario.comprobarPassword(pwd_actual)) {
            usuario.password = pwd_nuevo;
            yield usuario.save();
            res.json({ msg: "Password Almacenado Correctamente" });
            return;
        }
        else {
            const error = new Error("El Password Actual es Incorrecto");
            res.status(400).json({ msg: error.message });
            return;
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ msg: error.message });
            return;
        }
        else {
            console.log("Error desconocido al actualizar el password");
            res.status(500).json({ msg: 'Error al actualizar el password' });
            return;
        }
    }
});
exports.actualizarPassword = actualizarPassword;
