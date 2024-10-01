import App from './app';
import database from './datebase';

database();
const app = new App();
app.start();
