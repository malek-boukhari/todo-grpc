"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServiceDefinition = void 0;
const userServiceDefinition = (container) => {
    const userService = container.getNamed('Service', 'UserService');
    return {
        Register: (call, callback) => userService.Register(call, callback),
        Login: (call, callback) => userService.Login(call, callback),
        UpdateUser: (call, callback) => userService.UpdateUser(call, callback),
        DeleteUser: (call, callback) => userService.DeleteUser(call, callback)
    };
};
exports.userServiceDefinition = userServiceDefinition;
