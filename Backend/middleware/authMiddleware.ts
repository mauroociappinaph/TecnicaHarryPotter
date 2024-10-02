import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../src/models/User";  // Asegúrate de que IUser esté correctamente definido en tu modelo
import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";  // Importa Document de Mongoose

export interface AuthenticatedRequest extends Request {
    user?: Document<unknown, {}, IUser> & IUser & { _id: unknown };
}

const checkAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
        const error = new Error("Token no Válido o inexistente");
        res.status(403).json({ msg: error.message });
        return;
    }

    try {
        const [_, tokenString] = token.split(" ");
        if (!tokenString) {
            throw new Error("Token no Válido");
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET no está definido en las variables de entorno");
        }

        const decoded = jwt.verify(tokenString, jwtSecret) as JwtPayload;
        const user = await User.findById(decoded.id).select("-password -token -confirmado");

        if (!user) {
            throw new Error("El usuario no existe");
        }

        req.user = user as Document<unknown, {}, IUser> & IUser & { _id: unknown }; // Ajusta el tipo de `user`

        return next();
    } catch (error) {
        console.error(error);
        const e = new Error("Token no Válido");
        res.status(403).json({ msg: e.message });
    }
};

export default checkAuth;