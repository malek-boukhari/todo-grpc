import { inject, injectable, named } from 'inversify';
import * as grpc from '@grpc/grpc-js';

import { UserHandler } from '../handlers/UserHandler';
import { user_package as upkg } from '../generated/user';
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';

@injectable()
export class UserService {
    constructor(
        @inject('Handler')
        @named('UserHandler')
        private userHandler: UserHandler
    ) {
        // empty
    }

    public async Register(
        call: ServerUnaryCall<upkg.RegisterRequest, upkg.User>,
        callback: sendUnaryData<upkg.User>
    ): Promise<void> {
        const req = call.request;
        const errors = await this.userHandler.validateUserCreation(req);

        if (Object.keys(errors).length > 0) {
            const missingFields = Object.keys(errors).join(', ');

            callback({
                code: grpc.status.INVALID_ARGUMENT,
                details: `Missing or invalid fields: ${missingFields}`
            });
            return; // Force return. Callback still allows the rest of the code to be executed.
        }

        const createdUser: upkg.User = await this.userHandler.register(req);
        if (!createdUser) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error'
            });
        }

        callback(null, createdUser);
    }

    public async Login(
        call: ServerUnaryCall<upkg.LoginRequest, upkg.LoginResponse>,
        callback: sendUnaryData<upkg.LoginResponse>
    ): Promise<void> {
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

    public async GetUsers(
        call: ServerUnaryCall<upkg.GetUsersRequest, upkg.GetUsersResponse>,
        callback: sendUnaryData<upkg.GetUsersResponse>
    ): Promise<void> {
        const users = await this.userHandler.getByUsername(call.request);
        if (!users) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'The user could not be updated'
            });
        }

        callback(null, users);
    }

    // @authenticate
    public async UpdateUser(
        call: ServerUnaryCall<upkg.UpdateUserRequest, upkg.User>,
        callback: sendUnaryData<upkg.User>
    ): Promise<void> {
        const userId = call.request._id;
        const user = call.request.user;
        const updatedUser: upkg.User = await this.userHandler.updateUser(userId, user);
        if (!updatedUser) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'The user could not be updated'
            });
        }

        callback(null, updatedUser);
    }

    public async UpdatePassword(
        call: ServerUnaryCall<upkg.UpdatePasswordRequest, upkg.User>,
        callback: sendUnaryData<upkg.UpdatePasswordResponse>
    ): Promise<void> {
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
        callback(null, upkg.UpdatePasswordResponse.fromObject(success));
    }

    public async DeleteUser(
        call: ServerUnaryCall<upkg.DeleteUserRequest, upkg.DeleteUserResponse>,
        callback: sendUnaryData<upkg.DeleteUserResponse>
    ): Promise<void> {
        const userId = call.request._id;
        const isDeleted: boolean = await this.userHandler.deleteUser(userId);

        if (!isDeleted) {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'The user doesnt exist'
            });
        }

        const success = { success: isDeleted };
        callback(null, upkg.DeleteUserResponse.fromObject(success));
    }
}
