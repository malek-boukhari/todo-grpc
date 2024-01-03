import { injectable } from 'inversify';
import { IUser, UserModel } from '../entities/User';

@injectable()
export class UserRepository {
    public async findOneById(id: string): Promise<IUser | null> {
        const user = await UserModel.findById(id);
        if (Object.keys(user).length === 0) {
            return null;
        }

        // return a new object with _id as string instead of MongoDB's ObjectId
        return {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            avatar: user.avatar
        };
    }

    public async findUserPassword(id: string): Promise<string> {
        const user = await UserModel.findById(id);
        if (Object.keys(user).length === 0) {
            return null;
        }

        // return a new object with _id as string instead of MongoDB's ObjectId
        return user.password;
    }

    public async findByUsername(username: string): Promise<IUser[] | null> {
        // Matches users containing the username (i for case-sensitive)
        const users = await UserModel.find({ username: { $regex: '^' + username, $options: 'i' } });

        // return a new array with _id as string instead of MongoDB's ObjectId
        return users.map(user => {
            return {
                ...user.toObject(),
                _id: user._id.toString(),
                avatar: user.avatar
            };
        });
    }

    public async findOneByEmail(email: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ email });

        if (!user || Object.keys(user).length === 0) {
            return null;
        }

        // return a new object with _id as string instead of MongoDB's ObjectId
        return {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            password: user.password,
            avatar: user.avatar
        };
    }

    public async createOne(user: any): Promise<IUser> {
        const userDb = new UserModel({
            username: user.username,
            email: user.email,
            password: user.password,
            avatar: user.avatar
        });
        const createdUser = await userDb.save();

        return {
            _id: createdUser._id.toString(),
            username: createdUser.username,
            email: createdUser.email,
            avatar: user.avatar ?? ''
        };
    }

    public async updateOne(userId: string, updateFields: any): Promise<IUser> {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { ...updateFields },
            { returnOriginal: false }
        );

        return {
            _id: updatedUser._id.toString(),
            username: updatedUser.username,
            email: updatedUser.email,
            avatar: updatedUser.avatar
        };
    }

    public async updatePassword(userId: string, password: string): Promise<boolean> {
        const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, { password });

        return !!updatedUser;
    }

    public async deleteOne(id: string): Promise<any> {
        return UserModel.deleteOne({ _id: id });
    }
}
