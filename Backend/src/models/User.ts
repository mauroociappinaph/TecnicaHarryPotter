import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import generarId from '../../helpers/generarId';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    token: string;
    confirmado: boolean;
    comprobarPassword(passwordFormulario: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    token: {
        type: String,
        default: generarId(),
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
});

// Pre-save hook para encriptar la contraseña
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comprobar la contraseña
UserSchema.methods.comprobarPassword = async function (
    passwordFormulario: string
): Promise<boolean> {
    return await bcrypt.compare(passwordFormulario, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;