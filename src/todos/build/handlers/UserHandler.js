"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHandler = void 0;
const inversify_1 = require("inversify");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = require("../repositories/UserRepository");
const user_1 = require("../generated/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TaskRepository_1 = require("../repositories/TaskRepository");
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const TodoRepository_1 = require("../repositories/TodoRepository");
let UserHandler = class UserHandler {
    constructor(userRepository, taskRepository, categoryRepository, todoRepository, logger) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
        this.todoRepository = todoRepository;
        this.logger = logger;
    }
    async register(req) {
        try {
            const userObj = req.user.toObject();
            userObj.avatar = this.defaultAvatarConfig();
            const saltRounds = 8;
            userObj.password = await bcrypt_1.default.hash(userObj.password, saltRounds);
            const createdUser = await this.userRepository.createOne(userObj);
            return user_1.user_package.User.fromObject({ ...createdUser });
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async login(req) {
        const email = req.email;
        const password = req.password;
        const user = await this.userRepository.findOneByEmail(email);
        if (!user) {
            return null;
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return null;
        }
        const token = { token: this.generateToken(user) };
        return user_1.user_package.LoginResponse.fromObject(token);
    }
    async findById(id) {
        try {
            const user = await this.userRepository.findOneById(id);
            if (Object.keys(user).length > 0) {
                return user_1.user_package.User.fromObject(user);
            }
            return null;
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async getByUsername(req) {
        try {
            const username = req.userName;
            const users = await this.userRepository.findByUsername(username);
            return user_1.user_package.GetUsersResponse.fromObject({ users });
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async getByEmail(email) {
        try {
            const user = await this.userRepository.findOneByEmail(email);
            if (Object.keys(user).length > 0) {
                return user_1.user_package.User.fromObject(user);
            }
            return null;
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async updateUser(userId, user) {
        try {
            const userObj = user.toObject();
            const updateFields = this.generateUpdateFields(userObj);
            const updatedUser = await this.userRepository.updateOne(userId, updateFields);
            return user_1.user_package.User.fromObject(updatedUser);
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async updatePassword(userId, securityFields) {
        const { currentPassword, newPassword } = securityFields;
        const dbPassword = await this.userRepository.findUserPassword(userId);
        if (!dbPassword) {
            return false;
        }
        try {
            const isMatch = await bcrypt_1.default.compare(currentPassword, dbPassword);
            if (!isMatch) {
                return false;
            }
            const saltRounds = 8;
            const hash = await bcrypt_1.default.hash(newPassword, saltRounds);
            const isUpdated = await this.userRepository.updatePassword(userId, hash);
            return isUpdated;
        }
        catch (e) {
            this.logger.error(e);
            return false;
        }
    }
    async deleteUser(id) {
        try {
            const ownerTaskIds = await this.taskRepository.findByOwner(id);
            for (const taskId of ownerTaskIds) {
                await this.todoRepository.deleteMany(taskId);
            }
            await this.taskRepository.deleteMany(id);
            await this.categoryRepository.deleteMany(id);
            const isDeleted = await this.userRepository.deleteOne(id);
            return isDeleted.acknowledged;
        }
        catch (e) {
            this.logger.error(e);
            return false;
        }
    }
    generateUpdateFields(user) {
        const updateFields = {};
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
    generateToken(user) {
        return jsonwebtoken_1.default.sign({
            Id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }, process.env.BEARER_SECRET, {
            expiresIn: 60 * 60
        });
    }
    async validateUserCreation(req) {
        const errors = {};
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
    defaultAvatarConfig() {
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
};
exports.UserHandler = UserHandler;
exports.UserHandler = UserHandler = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('Repository')),
    __param(0, (0, inversify_1.named)('UserRepository')),
    __param(1, (0, inversify_1.inject)('Repository')),
    __param(1, (0, inversify_1.named)('TaskRepository')),
    __param(2, (0, inversify_1.inject)('Repository')),
    __param(2, (0, inversify_1.named)('CategoryRepository')),
    __param(3, (0, inversify_1.inject)('Repository')),
    __param(3, (0, inversify_1.named)('TodoRepository')),
    __param(4, (0, inversify_1.inject)('Logger')),
    __param(4, (0, inversify_1.named)('Logger')),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository,
        TaskRepository_1.TaskRepository,
        CategoryRepository_1.CategoryRepository,
        TodoRepository_1.TodoRepository, Object])
], UserHandler);
