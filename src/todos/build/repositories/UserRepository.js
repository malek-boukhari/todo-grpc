"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const inversify_1 = require("inversify");
const User_1 = require("../entities/User");
let UserRepository = class UserRepository {
    async findOneById(id) {
        const user = await User_1.UserModel.findById(id);
        if (Object.keys(user).length === 0) {
            return null;
        }
        return {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            avatar: user.avatar
        };
    }
    async findUserPassword(id) {
        const user = await User_1.UserModel.findById(id);
        if (Object.keys(user).length === 0) {
            return null;
        }
        return user.password;
    }
    async findByUsername(username) {
        const users = await User_1.UserModel.find({ username: { $regex: '^' + username, $options: 'i' } });
        return users.map(user => {
            return {
                ...user.toObject(),
                _id: user._id.toString(),
                avatar: user.avatar
            };
        });
    }
    async findOneByEmail(email) {
        const user = await User_1.UserModel.findOne({ email });
        if (!user || Object.keys(user).length === 0) {
            return null;
        }
        return {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            password: user.password,
            avatar: user.avatar
        };
    }
    async createOne(user) {
        var _a;
        const userDb = new User_1.UserModel({
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
            avatar: (_a = user.avatar) !== null && _a !== void 0 ? _a : ''
        };
    }
    async updateOne(userId, updateFields) {
        const updatedUser = await User_1.UserModel.findOneAndUpdate({ _id: userId }, { ...updateFields }, { returnOriginal: false });
        return {
            _id: updatedUser._id.toString(),
            username: updatedUser.username,
            email: updatedUser.email,
            avatar: updatedUser.avatar
        };
    }
    async updatePassword(userId, password) {
        const updatedUser = await User_1.UserModel.findOneAndUpdate({ _id: userId }, { password });
        return !!updatedUser;
    }
    async deleteOne(id) {
        return User_1.UserModel.deleteOne({ _id: id });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, inversify_1.injectable)()
], UserRepository);
