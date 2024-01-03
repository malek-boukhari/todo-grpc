import 'reflect-metadata';
import { Logger } from 'log4js';
import { Connection } from 'mongoose';
import { Container } from 'inversify';
import * as grpc from '@grpc/grpc-js';

import { bind, unbind } from './bind';
import { UserServiceDefinition } from './service-definitions/UserServiceDefinition';
import { TaskServiceDefinition } from './service-definitions/TaskServiceDefinition';
import { TodoServiceDefinition } from './service-definitions/TodoServiceDefinition';
import { user_package } from './generated/user';
import { task_package } from './generated/task';
import { todo_package } from './generated/todo';
import { category_package } from './generated/category';
import { CategoryServiceDefinition } from './service-definitions/CategoryServiceDefinition';

export class App {
    private readonly port: number;
    public readonly container: Container;
    private readonly server: grpc.Server;
    private readonly services: any[];

    constructor(port = 8009) {
        this.port =
            process.env.DEFAULT_PORT !== undefined ? parseInt(process.env.DEFAULT_PORT) : port;
        this.container = new Container();
        this.server = new grpc.Server(); // Create your gRPC server instance
        this.services = [
            {
                definition: user_package.UnimplementedUserServiceService.definition,
                implementation: UserServiceDefinition
            },
            {
                definition: task_package.UnimplementedTaskServiceService.definition,
                implementation: TaskServiceDefinition
            },
            {
                definition: todo_package.UnimplementedTodoServiceService.definition,
                implementation: TodoServiceDefinition
            },
            {
                definition: category_package.UnimplementedCategoryServiceService.definition,
                implementation: CategoryServiceDefinition
            }
        ];
    }

    public async start(): Promise<void> {
        await bind(this.container);

        const logger = this.container.getNamed<Logger>('Logger', 'Logger');
        const connection = this.container.getNamed<Connection>('Connection', 'NoSQL');

        if (process.env.NODE_ENV === 'dev') {
            connection.set('debug', true);
        }

        logger.info(`⚡ Connection to ${connection.name} established successfully`);

        // Add services:
        this.services.map(service => {
            this.server.addService(service.definition, service.implementation(this.container));
        });

        // Start the gRPC server
        this.server.bindAsync(
            `0.0.0.0:${this.port}`,
            grpc.ServerCredentials.createInsecure(),
            (error, port) => {
                if (error) {
                    logger.error(port);
                    logger.error(error);
                }

                this.server.start();
                logger.info(`⚡ Server is up & running on port ${port}`);
            }
        );
    }

    public async stop(): Promise<void> {
        await unbind(this.container);
    }
}
