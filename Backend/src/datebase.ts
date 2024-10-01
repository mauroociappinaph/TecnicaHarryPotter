import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

async function connect(): Promise<void> {
    try {
        if (!process.env.MONGODB_PASSWORD) {
            throw new Error('MONGODB_PASSWORD is not defined');
        }


        await mongoose.connect(`mongodb+srv://harrypotter:${process.env.MONGODB_PASSWORD}@cluster0.zp2c3.mongodb.net/`);
        console.log('Database connected');
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}

export default connect;