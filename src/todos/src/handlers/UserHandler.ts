import { inject, injectable, named } from 'inversify';
import { Logger } from 'log4js';
import bcrypt from 'bcrypt';

import { UserRepository } from '../repositories/UserRepository';
import { user_package } from '../generated/user';
import jwt from 'jsonwebtoken';
import { IAvatar, IUser } from '../entities/User';
import { TaskRepository } from '../repositories/TaskRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';
import UpdatePasswordResponse = user_package.UpdatePasswordResponse;
import { TodoRepository } from '../repositories/TodoRepository';

@injectable()
export class UserHandler {
    constructor(
        @inject('Repository')
        @named('UserRepository')
        private userRepository: UserRepository,
        @inject('Repository')
        @named('TaskRepository')
        private taskRepository: TaskRepository,
        @inject('Repository')
        @named('CategoryRepository')
        private categoryRepository: CategoryRepository,
        @inject('Repository')
        @named('TodoRepository')
        private todoRepository: TodoRepository,
        @inject('Logger')
        @named('Logger')
        private logger: Logger
    ) {
        // pass
    }

    public async register(req: user_package.RegisterRequest): Promise<user_package.User | null> {
        try {
            // Convert the input 'user_package.User' message to a plain JavaScript object.
            const userObj: any = req.user.toObject();
            userObj.avatar = this.defaultAvatarConfig();

            // hash the password
            const saltRounds = 8;
            userObj.password = await bcrypt.hash(userObj.password, saltRounds);

            const createdUser: IUser = await this.userRepository.createOne(userObj);

            // Convert user back to 'user_package.RegisterResponse' message and return
            return user_package.User.fromObject({ ...createdUser });
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    public async login(req: user_package.LoginRequest): Promise<user_package.LoginResponse> {
        const email: string = req.email;
        const password: string = req.password;
        const user: IUser | null = await this.userRepository.findOneByEmail(email);

        if (!user) {
            return null;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return null;
        }

        const token = { token: this.generateToken(user) };

        return user_package.LoginResponse.fromObject(token);
    }

    public async findById(id: string): Promise<user_package.User | null> {
        try {
            const user = await this.userRepository.findOneById(id);
            if (Object.keys(user).length > 0) {
                // Convert user object back 'user_package.User' message and return
                return user_package.User.fromObject(user);
            }

            return null;
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    /**
     * Finds users matching a username.
     *
     * @param req - The request object containing the username to search for.
     * @returns A Promise that resolves to a GetUsersResponse or null.
     *   - If successful, the response contains a list of users matching the provided username.
     *   - If an error occurs during the operation, null is returned, and the error is logged.
     */
    public async getByUsername(
        req: user_package.GetUsersRequest
    ): Promise<user_package.GetUsersResponse | null> {
        try {
            const username = req.userName;
            const users = await this.userRepository.findByUsername(username);

            // Convert user object back 'user_package.User' message and return
            return user_package.GetUsersResponse.fromObject({ users });
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    public async getByEmail(email: string): Promise<user_package.User | null> {
        try {
            const user = await this.userRepository.findOneByEmail(email);
            if (Object.keys(user).length > 0) {
                // Convert user object back 'user_package.User' message and return
                return user_package.User.fromObject(user);
            }

            return null;
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    public async updateUser(userId: string, user: any): Promise<user_package.User> {
        try {
            const userObj = user.toObject();
            const updateFields = this.generateUpdateFields(userObj);

            const updatedUser: IUser = await this.userRepository.updateOne(userId, updateFields);

            return user_package.User.fromObject(updatedUser);
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    public async updatePassword(userId: string, securityFields: any): Promise<boolean> {
        const { currentPassword, newPassword } = securityFields;
        const dbPassword = await this.userRepository.findUserPassword(userId);
        if (!dbPassword) {
            return false;
        }

        try {
            const isMatch = await bcrypt.compare(currentPassword, dbPassword);
            if (!isMatch) {
                return false;
            }

            const saltRounds = 8;
            const hash: string = await bcrypt.hash(newPassword, saltRounds);

            const isUpdated: boolean = await this.userRepository.updatePassword(userId, hash);

            return isUpdated;
        } catch (e) {
            this.logger.error(e);
            return false;
        }
    }

    public async deleteUser(id: string): Promise<boolean> {
        try {
            // delete the todos associated to the user owned tasks
            const ownerTaskIds = await this.taskRepository.findByOwner(id);
            for (const taskId of ownerTaskIds) {
                await this.todoRepository.deleteMany(taskId);
            }

            // Delete the tasks owned by the user
            await this.taskRepository.deleteMany(id);

            // Delete the categories owned by the user
            await this.categoryRepository.deleteMany(id);

            const isDeleted = await this.userRepository.deleteOne(id);

            // mongodb deleteOne returns an object { acknowledged: boolean, deletedCount: number }
            return isDeleted.acknowledged;
        } catch (e) {
            this.logger.error(e);
            return false;
        }
    }

    // Helper function to generate the updateFields object based on user fields
    private generateUpdateFields(user: any): { [key: string]: any } {
        const updateFields: { [key: string]: any } = {};

        if (user.username) {
            updateFields.username = user.username;
        }
        if (user.email) {
            updateFields.email = user.email;
        }
        if (user.password) {
            updateFields.password = user.password;
        }
        if (user.avatar) {
            updateFields.avatar = user.avatar;
        }

        return updateFields;
    }

    private generateToken(user: IUser): string {
        return jwt.sign(
            {
                Id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            },
            process.env.BEARER_SECRET,
            {
                expiresIn: 60 * 60
            }
        );
    }

    public async validateUserCreation(
        req: user_package.RegisterRequest
    ): Promise<Record<string, Record<string, string>>> {
        const errors: any = {};
        const requestFields = req.user;

        if (!requestFields) {
            errors['user'] = { message: 'Required field' };
        }

        if (requestFields && !requestFields.username) {
            errors['username'] = { message: 'Required field' };
        }

        if (requestFields && !requestFields.email) {
            errors['email'] = { message: 'Required field' };
        }

        if (requestFields && !requestFields.password) {
            errors['password'] = { message: 'Required field' };
        }

        if (requestFields && requestFields.email) {
            const emailExists = await this.userRepository.findOneByEmail(requestFields.email);

            if (emailExists) {
                errors['email'] = { message: 'Email already exists' };
            }
        }

        return errors;
    }

    private defaultAvatarConfig(): IAvatar {
        return {
            sex: 'man',
            hairStyle: 'normal',
            hairColor: '#4c2323',
            faceColor: '#fad7d7',
            eyeStyle: 'smile',
            earSize: 'small',
            noseStyle: 'long',
            mouthStyle: 'smile',
            glassesStyle: 'round',
            hatStyle: 'none',
            hatColor: '#000',
            shirtStyle: 'polo',
            shirtColor: '#83b1f1',
            bgColor: 'linear-gradient(45deg, rgb(23, 41, 255) 0%, rgb(255, 86, 247) 100%)'
        };
    }
}
