import nodemailer from "nodemailer";

// Definición de la interfaz para los datos del correo
interface EmailData {
    email: string;
    nombre: string;
    token: string;
}

const emailOlvidePassword = async (datos: EmailData): Promise<void> => {
    // Crear el transportador para enviar el correo
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const { email, nombre, token } = datos;

    // Enviar el email
    const info = await transporter.sendMail({
        from: "Harry Potter",
        to: email,
        subject: "Reestablece tu Password",
        text: "Reestablece tu Password",
        html: `<p>Hola: ${nombre}, has solicitado reestablecer tu password.</p>
        <p>Sigue el siguiente enlace para generar un nuevo password:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a> </p>
        <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>`,
    });

    console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;