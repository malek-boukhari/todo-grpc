import { Schema, model, Document } from 'mongoose';

export interface IAvatar {
    sex: 'man' | 'woman';
    hairStyle: 'normal' | 'thick' | 'mohawk' | 'womanLong' | 'womanShort';
    hairColor: string;
    faceColor: string;
    eyeStyle: 'circle' | 'oval' | 'smile';
    earSize: 'small' | 'big';
    noseStyle: 'short' | 'long' | 'round';
    mouthStyle: 'laugh' | 'smile' | 'peace';
    glassesStyle: 'none' | 'round' | 'square';
    hatStyle: 'none' | 'beanie' | 'turban';
    hatColor: string;
    shirtStyle: 'hoody' | 'short' | 'polo';
    shirtColor: string;
    bgColor: string;
}

interface UserCreation {
    username: string;
    email: string;
    password?: string;
    avatar?: IAvatar;
}

interface IUser extends UserCreation {
    _id: string;
}

export interface UserDocument extends Document, UserCreation {}

const userSchema = new Schema<UserDocument>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: Object, required: false }
});

const UserModel = model<UserDocument>('User', userSchema);

export { UserModel, IUser };
