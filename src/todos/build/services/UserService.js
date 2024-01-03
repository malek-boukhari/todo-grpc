"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const inversify_1 = require("inversify");
const grpc = __importStar(require("@grpc/grpc-js"));
const UserHandler_1 = require("../handlers/UserHandler");
const user_1 = require("../generated/user");
let UserService = class UserService {
    constructor(userHandler) {
        this.userHandler = userHandler;
    }
    async Register(call, callback) {
        const req = call.request;
        const errors = await this.userHandler.validateUserCreation(req);
        if (Object.keys(errors).length > 0) {
            const missingFields = Object.keys(errors).join(', ');
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                details: `Missing or invalid fields: ${missingFields}`
            });
            return;
        }
        const createdUser = await this.userHandler.register(req);
        if (!createdUser) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error'
            });
        }
        callback(null, createdUser);
    }
    async Login(call, callback) {
        const req = call.request;
        const token = await this.userHandler.login(req);
        if (!token) {
            callback({
                code: grpc.status.UNAUTHENTICATED,
                details: 'Incorrect email or password'
            });
        }
        callback(null, token);
    }
    async GetUsers(call, callback) {
        const users = await this.userHandler.getByUsername(call.request);
        if (!users) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'The user could not be updated'
            });
        }
        callback(null, users);
    }
    async UpdateUser(call, callback) {
        const userId = call.request._id;
        const user = call.request.user;
        const updatedUser = await this.userHandler.updateUser(userId, user);
        if (!updatedUser) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'The user could not be updated'
            });
        }
        callback(null, updatedUser);
    }
    async UpdatePassword(call, callback) {
        const userId = call.request._id;
        const securityFields = call.request.security;
        const isUpdated = await this.userHandler.updatePassword(userId, securityFields);
        if (!isUpdated) {
            callback({
                code: grpc.status.UNAUTHENTICATED,
                details: 'The user could not be updated'
            });
        }
        const success = { success: isUpdated };
        callback(null, user_1.user_package.UpdatePasswordResponse.fromObject(success));
    }
    async DeleteUser(call, callback) {
        const userId = call.request._id;
        const isDeleted = await this.userHandler.deleteUser(userId);
        if (!isDeleted) {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'The user doesnt exist'
            });
        }
        const success = { success: isDeleted };
        callback(null, user_1.user_package.DeleteUserResponse.fromObject(success));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('Handler')),
    __param(0, (0, inversify_1.named)('UserHandler')),
    __metadata("design:paramtypes", [UserHandler_1.UserHandler])
], UserService);
