import jwt from "jsonwebtoken";

const generarJWT = (id: string): string => {
    if (!id) {
        throw new Error("No se ha proporcionado un id");
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("No se ha proporcionado un secreto para el token");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

export default generarJWT;