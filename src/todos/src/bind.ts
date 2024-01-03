import { Logger } from 'log4js';
import { Container } from 'inversify';
import { Connection } from 'mongoose';

import { AppLoggerConfigure } from './helpers/AppLoggerConfigure';
import { DbConnectionManager } from './helpers/DbConnectionManager';
import { UserService } from './services/UserService';
import { UserHandler } from './handlers/UserHandler';
import { UserRepository } from './repositories/UserRepository';
import { TaskRepository } from './repositories/TaskRepository';
import { TodoRepository } from './repositories/TodoRepository';
import { TaskHandler } from './handlers/TaskHandler';
import { TaskService } from './services/TaskService';
import { TodoService } from './services/TodoService';
import { TodoHandler } from './handlers/TodoHandler';
import { CategoryService } from './services/CategoryService';
import { CategoryHandler } from './handlers/CategoryHandler';
import { CategoryRepository } from './repositories/CategoryRepository';

export async function bind(container: Container): Promise<void> {
    // Bind Logger
    const logger: Logger = new AppLoggerConfigure().logger;
    container.bind<Logger>('Logger').toConstantValue(logger).whenTargetNamed('Logger');

    // Bind Controllers

    container
        .bind<UserService>('Service')
        .to(UserService)
        .inSingletonScope()
        .whenTargetNamed('UserService');

    container
        .bind<TaskService>('Service')
        .to(TaskService)
        .inSingletonScope()
        .whenTargetNamed('TaskService');

    container
        .bind<TodoService>('Service')
        .to(TodoService)
        .inSingletonScope()
        .whenTargetNamed('TodoService');

    container
        .bind<CategoryService>('Service')
        .to(CategoryService)
        .inSingletonScope()
        .whenTargetNamed('CategoryService');

    // Bind handlers
    container
        .bind<UserHandler>('Handler')
        .to(UserHandler)
        .inSingletonScope()
        .whenTargetNamed('UserHandler');

    container
        .bind<TaskHandler>('Handler')
        .to(TaskHandler)
        .inSingletonScope()
        .whenTargetNamed('TaskHandler');

    container
        .bind<TodoHandler>('Handler')
        .to(TodoHandler)
        .inSingletonScope()
        .whenTargetNamed('TodoHandler');

    container
        .bind<CategoryHandler>('Handler')
        .to(CategoryHandler)
        .inSingletonScope()
        .whenTargetNamed('CategoryHandler');

    // Bind Repositories
    container
        .bind<UserRepository>('Repository')
        .to(UserRepository)
        .inSingletonScope()
        .whenTargetNamed('UserRepository');

    container
        .bind<TaskRepository>('Repository')
        .to(TaskRepository)
        .inSingletonScope()
        .whenTargetNamed('TaskRepository');

    container
        .bind<TodoRepository>('Repository')
        .to(TodoRepository)
        .inSingletonScope()
        .whenTargetNamed('TodoRepository');

    container
        .bind<CategoryRepository>('Repository')
        .to(CategoryRepository)
        .inSingletonScope()
        .whenTargetNamed('CategoryRepository');

    // Instantiate and bind connection
    const connection = await DbConnectionManager.createConnection();
    container.bind<Connection>('Connection').toConstantValue(connection).whenTargetNamed('NoSQL');
}

export async function unbind(container: Container): Promise<void> {
    await container.getNamed<Connection>('Connection', 'NoSQL').close();
    container.unbindAll();
}
