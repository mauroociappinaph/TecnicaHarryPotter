import mongoose from 'mongoose';

const CharactersSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    alternate_names: {
        type: [String],
        default: []
    },
    species: {
        type: String
    },

    house: {
        type: String
    },
    wizard: {
        type: Boolean
    },
    patronus: {
        type: String
    },
    hogwartsStudent: {
        type: Boolean
    },
    hogwartsStaff: {
        type: Boolean
    },
    alive: {
        type: Boolean
    },
    image: {
        type: String
    }
});

// Exportar el modelo
const Characters = mongoose.model('Characters', CharactersSchema);

export default Characters;