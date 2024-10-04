# Técnica Harry Potter

¡Bienvenido a **TécnicaHP**! Este proyecto está dividido en backend y frontend, ambos trabajando juntos para gestionar una aplicación interactiva basada en la API de personajes de Harry Potter.

### API Utilizada

- **API de personajes**: [https://hp-api.onrender.com/api/characters](https://hp-api.onrender.com/api/characters)

### Clúster MongoDB

- **Usuario**: harrypotter
- **Contraseña**: harrypotter

### Documentación de Swagger

- URL: [http://localhost:4000/api-docs](http://localhost:4000/api-docs)

---

## Proyecto Completo

El proyecto está compuesto de dos secciones principales:

- **Backend**: Implementado en Node.js y Express. Este lado maneja la autenticación, gestión de usuarios y lógica de negocio.
- **Frontend**: Desarrollado en React y Tailwind CSS, brinda una experiencia de usuario atractiva y dinámica.

---

## Estructura de Archivos

### Backend

- **`helpers/`**: Funciones de ayuda para la lógica del negocio.
- **`middleware/`**: Middlewares personalizados para autenticación y manejo de solicitudes.
- **`src/`**: Carpeta principal con subdirectorios esenciales:
  - **`http-requests/`**: Módulos para solicitudes HTTP.
  - **`models/`**: Modelos de datos y esquemas de MongoDB.
  - **`controllers/`**: Controladores de la lógica de la aplicación.
  - **`routes/`**: Definición de rutas de la API.

### Frontend

- **`components/`**: Componentes de la interfaz de usuario.
- **`context/`**: Contextos de React para manejo del estado global.
- **`hooks/`**: Hooks personalizados para lógica reutilizable.
- **`pages/`**: Vistas principales de la aplicación.
- **`config/`**: Configuración global de la API
- **`types/`**: Definiciones de tipos TypeScript compartidos en la aplicación para garantizar tipado consistente.

---

## Dependencias Principales

### Backend

- **express**
- **jsonwebtoken**
- **mongoose**
- **nodemailer**
- **redis**
- **swagger-jsdoc**
- **swagger-ui-express**

### Frontend

- **react**
- **react-router-dom**
- **tailwindcss**
- **@radix-ui/**
- **axios**

---

## Configuración del Entorno

Asegúrate de definir las variables de entorno en un archivo `.env` para el correcto funcionamiento del proyecto:

### Backend

```plaintext
PORT=4000
JWT_SECRET=jwtsecreta
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=4a2e01d4b7e9d7
EMAIL_PASS=e4fa6f920a9808
FRONTEND_URL=http://localhost:5173
MONGODB_PASSWORD=harrypotter
```

### Frontend

```plaintext
VITE_BACKEND_URL=http://localhost:4000
IMAGENES_URL=public/url
```

---

## Funcionalidades de envíos de mail.

Confirmación de cuenta y restablecimiento de contraseña:

- **Link de confirmación**: [https://mailtrap.io/](https://mailtrap.io/)
- **Email**: ciappinamaurooj@gmail.com
- **Contraseña**: Mauro123Ciappina

---

## Instrucciones de Instalación

1. **Clonar el repositorio**. (https://github.com/mauroociappinaph/TecnicaHarryPotter/tree/main)

2. Instalar las dependencias en cada carpeta (`FrontHP` y `Back`):

   ```bash
   # Backend
   cd Back
   npm install

   # Frontend
   cd ../FrontHP
   npm install
   ```

---

## Instrucciones de Ejecución

Para iniciar los servidores de desarrollo:

### Backend

```bash
npx nodemon
```

### Frontend

```bash
npm run dev
```

---
