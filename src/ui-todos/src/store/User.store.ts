import { create } from 'zustand';
import * as jwt from 'jsonwebtoken';
import { UsersGateway } from '../api/gateways/UsersGateway.ts';
import { fetchByKey, persistByKey } from '../utils/storage.ts';
import type { LoginResponse, User } from '../generated/user_pb.ts';

const usersGateway = new UsersGateway();

export interface IUserStore {
    users: any[];
    getUsers: (username: string) => Promise<void>;
    currentUser: any | null;
    login: (data: any) => Promise<boolean>;
    token: string;
    updateUser: (userId: string, user: User) => Promise<boolean>;
    updatePassword: (userId: string, fields: any) => Promise<boolean>;
    register: (user: User) => Promise<boolean>;
    showDeleteUser: boolean;
    setShowDeleteUser: (showDeleteUser: boolean) => void;
    deleteUser: (taskId: string) => Promise<boolean>;
    clearCurrentUser: () => void;
}

const initialState = {
    users: [],
    getUsers: () => Promise.resolve(),
    currentUser: fetchByKey('user') || null,
    login: () => Promise.resolve(true),
    token: fetchByKey('token') || '',
    updateUser: () => Promise.resolve(false),
    updatePassword: () => Promise.resolve(),
    register: () => Promise.resolve(false),
    showDeleteUser: false,
    setShowDeleteUser: () => {},
    deleteUser: () => Promise.resolve(),
    clearCurrentUser: () => {}
};

export const useUserStore = create<IUserStore>((set) => {
    return {
        ...initialState,

        async register(data: any): Promise<boolean> {
            const user = await usersGateway.register(data);

            return !!user;
        },

        async login(data: any): Promise<boolean> {
            const resp: LoginResponse | null = await usersGateway.login(data.email, data.password);
            if (!resp) {
                return false;
            }

            // decode the token and extract current user data
            const userData = jwt.decode(resp.token);

            // persist the token and current user data in localstorage
            persistByKey('token', resp.token);
            persistByKey('user', userData);

            set((state: IUserStore) => {
                return {
                    ...state,
                    currentUser: userData,
                    token: resp.token
                };
            });

            return true;
        },

        async getUsers(username: string): Promise<void> {
            const data = await usersGateway.getUsers(username);
            if (!data) {
                return;
            }

            set((state: IUserStore) => {
                return {
                    ...state,
                    users: data.users
                };
            });
        },

        async updateUser(userId: string, user: any): Promise<boolean> {
            const data = await usersGateway.updateUser(userId, user);
            if (!data) {
                return false;
            }
            persistByKey('user', data);

            set((state: IUserStore) => {
                return {
                    ...state,
                    currentUser: data
                };
            });

            return true;
        },

        async updatePassword(userId: string, security: any): Promise<boolean> {
            const data = await usersGateway.updatePassword(userId, security);
            if (!data) {
                return false;
            }

            return data.success;
        },

        clearCurrentUser(): void {
            localStorage.clear();

            set((state: IUserStore) => {
                return {
                    ...state,
                    currentUser: null,
                    token: ''
                };
            });
        },

        setShowDeleteUser(showDeleteUser: boolean): void {
            set((state: IUserStore) => {
                return {
                    ...state,
                    showDeleteUser
                };
            });
        },

        async deleteUser(userId: string): Promise<boolean> {
            try {
                const resp = await usersGateway.deleteUser(userId);

                if (!resp) {
                    return false;
                }

                return resp.success;
            } catch (e) {
                console.error(e);
                return false;
            }
        }
    };
});
