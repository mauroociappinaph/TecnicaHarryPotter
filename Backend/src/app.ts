import express, { Application as ExpressApp, Router } from 'express';
import morgan from 'morgan';
import userRoutes from '../src/routes/user/userRoutes';
import charactersRoutes from '../src/routes/characters/charactersRoutes';
import cors from 'cors';

class Application {
    private app: ExpressApp;
    private router: Router;


    constructor() {
        this.app = express();
        this.router = Router();
        this.settings();
        this.middlewares();
        this.routes();
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
        // Puedes añadir más rutas aquí si lo necesitas
    }

    public start() {
        this.app.use('/', this.router);
        this.app.listen(this.app.get('port'), () => {
            console.log('Server running on port', this.app.get('port'));
        });
    }
}

export default Application;