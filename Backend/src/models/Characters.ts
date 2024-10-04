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
    role: { type: String },
    house: { type: String },
    species: { type: String },
    wizard: { type: Boolean },
    patronus: { type: String },
    hogwartsStudent: { type: Boolean },
    hogwartsStaff: { type: Boolean },
    alive: { type: Boolean },
    image: { type: String }
});

const Characters = model<Character>('Characters', characterSchema);

export default Characters;