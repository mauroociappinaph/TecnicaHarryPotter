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
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailRegistro = (datos) => __awaiter(void 0, void 0, void 0, function* () {
    if (!datos.email || !datos.nombre || !datos.token) {
        throw new Error("Datos de registro incompletos");
    }
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    console.log(datos);
    try {
        const info = yield transporter.sendMail({
            from: '"Harry Potter" <test@mailtrap.io>',
            to: datos.email,
            subject: "Comprueba tu cuenta",
            text: "Comprueba tu cuenta en Harry Potter",
            html: `<p style="font-size: 16px; color: #333; font-family: Arial, sans-serif; line-height: 1.5;">
            Hola <strong style="color: #ffcc00;">${datos.nombre}</strong>,
          </p>
          
          <p style="font-size: 16px; color: #333; font-family: Arial, sans-serif; line-height: 1.5;">
            Tu cuenta en <span style="font-weight: bold; color: #ffcc00;">Harry Potter</span> ya está lista. 
            Solo necesitas comprobarla haciendo clic en el siguiente enlace:
          </p>
          
          <p style="font-size: 16px; text-align: center; margin: 20px 0;">
            <a href="${process.env.FRONTEND_URL}/confirmar/${datos.token}" 
               style="background-color: #ffcc00; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-family: Arial, sans-serif;">
              Comprobar Cuenta
            </a>
          </p>
          
          <p style="font-size: 14px; color: #666; font-family: Arial, sans-serif; line-height: 1.5;">
            Si tú no creaste esta cuenta, puedes ignorar este mensaje.
          </p>
            `,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error al enviar el email: ", error.message);
            throw new Error(`Error al enviar el email: ${error.message}`);
        }
        else {
            console.error("Error desconocido al enviar el email");
            throw new Error("Error desconocido al enviar el email");
        }
    }
});
exports.default = emailRegistro;
