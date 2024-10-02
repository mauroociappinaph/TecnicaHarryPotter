import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface Character extends Document {
    id: string;
    name: string;
    role: string;
    house: string;
    species: string;
    wizard: boolean;
    patronus: string;
    hogwartsStudent: boolean;
    hogwartsStaff: boolean;
    alive: boolean;
    image: string;
}

const characterSchema = new Schema<Character>({
    id: { type: String, default: uuidv4 },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    house: { type: String, required: true },
    species: { type: String, required: true },
    wizard: { type: Boolean, required: true },
    patronus: { type: String, required: true },
    hogwartsStudent: { type: Boolean, required: true },
    hogwartsStaff: { type: Boolean, required: true },
    alive: { type: Boolean, required: true },
    image: { type: String, required: true }
});

const Characters = model<Character>('Characters', characterSchema);

export default Characters;