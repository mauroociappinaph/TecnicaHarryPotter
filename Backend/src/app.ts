import express, { Application as ExpressApp, Router } from 'express';
import morgan from 'morgan';
import userRoutes from '../src/routes/user/userRoutes';
import charactersRoutes from '../src/routes/characters/charactersRoutes';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

class Application {
    private app: ExpressApp;
    private router: Router;


    constructor() {
        this.app = express();
        this.router = Router();
        this.settings();
        this.middlewares();
        this.routes();
        this.swaggerSetup();
    }

    private settings() {
        this.app.set('port', process.env.PORT || 4000);
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    private routes() {
        this.router.use('/api/user', userRoutes);
        this.router.use('/api/characters', charactersRoutes);

    }


    private swaggerSetup() {
        const swaggerOptions = {
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'API de Harry Potter',
                    version: '1.0.0',
                    description: 'Documentación de la API de Harry Potter.',
                },
                servers: [
                    {
                        url: process.env.FRONTEND_URL || ' http://localhost:5173',
                    },
                ],
            },
            apis: ['./src/routes/user/userRoutes.ts', './src/routes/characters/charactersRoutes.ts'],
        };

        const swaggerDocs = swaggerJsDoc(swaggerOptions);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    }

    public start() {
        this.app.use('/', this.router);
        this.app.listen(this.app.get('port'), () => {
            console.log('Server running on port', this.app.get('port'));
        });
    }
}

export default Application;