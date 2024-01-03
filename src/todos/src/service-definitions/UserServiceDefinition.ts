import { Container } from 'inversify';
import { UserService } from '../services/UserService';
import { user_package } from '../generated/user';

export const UserServiceDefinition = (
    container: Container
): user_package.UnimplementedUserServiceService => {
    const userService = container.getNamed<UserService>('Service', 'UserService');

    return {
        Register: (call, callback) => userService.Register(call, callback),
        Login: (call, callback) => userService.Login(call, callback),
        GetUsers: (call, callback) => userService.GetUsers(call, callback),
        UpdateUser: (call, callback) => userService.UpdateUser(call, callback),
        UpdatePassword: (call, callback) => userService.UpdatePassword(call, callback),
        DeleteUser: (call, callback) => userService.DeleteUser(call, callback)
    };
};
