import { createGrpcWebTransport } from '@connectrpc/connect-web';
import { createPromiseClient } from '@connectrpc/connect';
import { UserService } from '../../generated/user_connect.ts';
import {
    DeleteUserRequest,
    DeleteUserResponse,
    GetUsersRequest,
    GetUsersResponse,
    LoginResponse,
    RegisterRequest,
    SecurityFields,
    UpdatePasswordRequest,
    UpdatePasswordResponse,
    UpdateUserRequest,
    User
} from '../../generated/user_pb.ts';
import type { PromiseClient, Transport } from '@connectrpc/connect';

export class UsersGateway {
    private readonly transport: Transport;
    private client: PromiseClient<typeof UserService>;

    constructor() {
        this.transport = createGrpcWebTransport({
            baseUrl: import.meta.env.VITE_TODOS_BASE_URL
        });
        this.client = createPromiseClient(UserService, this.transport);
    }

    async register(data: any): Promise<User | null> {
        try {
            const request = new RegisterRequest({ user: data });

            return await this.client.register(request);
        } catch (e) {
            console.log(e);

            return null;
        }
    }

    async login(email: string, password: string): Promise<LoginResponse | null> {
        try {
            return await this.client.login({ email, password });
        } catch (e) {
            console.log(e);

            return null;
        }
    }

    async getUsers(userName: string): Promise<GetUsersResponse | null> {
        try {
            const request = new GetUsersRequest({ userName });

            return await this.client.getUsers(request);
        } catch (e) {
            console.log(e);

            return null;
        }
    }

    async updateUser(Id: string, user: User): Promise<User | null> {
        try {
            const request = new UpdateUserRequest({ Id, user });

            return await this.client.updateUser(request);
        } catch (e) {
            console.log(e);

            return null;
        }
    }

    async updatePassword(
        Id: string,
        securityFields: SecurityFields
    ): Promise<UpdatePasswordResponse | null> {
        try {
            const request = new UpdatePasswordRequest({ Id, security: securityFields });

            return await this.client.updatePassword(request);
        } catch (e) {
            console.log(e);

            return null;
        }
    }

    async deleteUser(userId: string): Promise<DeleteUserResponse | null> {
        try {
            const request = new DeleteUserRequest({ Id: userId });

            return await this.client.deleteUser(request);
        } catch (e) {
            console.log(e);

            return null;
        }
    }
}
