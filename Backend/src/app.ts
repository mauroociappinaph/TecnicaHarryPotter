import express from 'express';

class Application {
    app: express.Application;

    constructor() {
        this.app = express();
    }

    start() {
        this.app.listen(4000, () => {
            console.log('Server running on port 4000');
        });
    }
}


export default Application;