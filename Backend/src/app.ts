import express from 'express';
import morgan from 'morgan';



class Application {
    app: express.Application;


    constructor() {
        this.app = express();
        this.settings()
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', process.env.PORT || 4000);


    }


    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello world');
        });
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server running on port', this.app.get('port'));
        });
    }
}


export default Application;