import nodemailer from "nodemailer";

const emailRegistro = async (datos: { email: string | null; nombre: string | null; token: string | null; }) => {
    if (!datos.email || !datos.nombre || !datos.token) {
        throw new Error("Datos de registro incompletos");
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    console.log(datos);

    try {
        const info = await transporter.sendMail({
            from: '"Harry Potter" <test@mailtrap.io>',
            to: datos.email,
            subject: "Comprueba tu cuenta",
            text: "Comprueba tu cuenta en Harry Potter",
            html: `<p>Hola: ${datos.nombre}, comprueba tu cuenta en Harry Potter</p>
                   <p>Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace:
                   <a href="${process.env.FRONTEND_URL}/confirmar/${datos.token}">Comprobar Cuenta</a> </p>
                   <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
            `,
        });

        console.log("Mensaje enviado: %s", info.messageId);
    } catch (error: unknown) {
        if (error instanceof Error) {

            console.error("Error al enviar el email: ", error.message);
            throw new Error(`Error al enviar el email: ${error.message}`);
        } else {

            console.error("Error desconocido al enviar el email");
            throw new Error("Error desconocido al enviar el email");
        }
    }
};

export default emailRegistro;