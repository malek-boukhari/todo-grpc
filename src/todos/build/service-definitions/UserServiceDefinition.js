"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceDefinition = void 0;
const UserServiceDefinition = (container) => {
    const userService = container.getNamed('Service', 'UserService');
    return {
        Register: (call, callback) => userService.Register(call, callback),
        Login: (call, callback) => userService.Login(call, callback),
        GetUsers: (call, callback) => userService.GetUsers(call, callback),
        UpdateUser: (call, callback) => userService.UpdateUser(call, callback),
        UpdatePassword: (call, callback) => userService.UpdatePassword(call, callback),
        DeleteUser: (call, callback) => userService.DeleteUser(call, callback)
    };
};
exports.UserServiceDefinition = UserServiceDefinition;
