"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unbind = exports.bind = void 0;
const AppLoggerConfigure_1 = require("./helpers/AppLoggerConfigure");
const DbConnectionManager_1 = require("./helpers/DbConnectionManager");
const UserService_1 = require("./services/UserService");
const UserHandler_1 = require("./handlers/UserHandler");
const UserRepository_1 = require("./repositories/UserRepository");
const TaskRepository_1 = require("./repositories/TaskRepository");
const TodoRepository_1 = require("./repositories/TodoRepository");
const TaskHandler_1 = require("./handlers/TaskHandler");
const TaskService_1 = require("./services/TaskService");
const TodoService_1 = require("./services/TodoService");
const TodoHandler_1 = require("./handlers/TodoHandler");
const CategoryService_1 = require("./services/CategoryService");
const CategoryHandler_1 = require("./handlers/CategoryHandler");
const CategoryRepository_1 = require("./repositories/CategoryRepository");
async function bind(container) {
    const logger = new AppLoggerConfigure_1.AppLoggerConfigure().logger;
    container.bind('Logger').toConstantValue(logger).whenTargetNamed('Logger');
    container
        .bind('Service')
        .to(UserService_1.UserService)
        .inSingletonScope()
        .whenTargetNamed('UserService');
    container
        .bind('Service')
        .to(TaskService_1.TaskService)
        .inSingletonScope()
        .whenTargetNamed('TaskService');
    container
        .bind('Service')
        .to(TodoService_1.TodoService)
        .inSingletonScope()
        .whenTargetNamed('TodoService');
    container
        .bind('Service')
        .to(CategoryService_1.CategoryService)
        .inSingletonScope()
        .whenTargetNamed('CategoryService');
    container
        .bind('Handler')
        .to(UserHandler_1.UserHandler)
        .inSingletonScope()
        .whenTargetNamed('UserHandler');
    container
        .bind('Handler')
        .to(TaskHandler_1.TaskHandler)
        .inSingletonScope()
        .whenTargetNamed('TaskHandler');
    container
        .bind('Handler')
        .to(TodoHandler_1.TodoHandler)
        .inSingletonScope()
        .whenTargetNamed('TodoHandler');
    container
        .bind('Handler')
        .to(CategoryHandler_1.CategoryHandler)
        .inSingletonScope()
        .whenTargetNamed('CategoryHandler');
    container
        .bind('Repository')
        .to(UserRepository_1.UserRepository)
        .inSingletonScope()
        .whenTargetNamed('UserRepository');
    container
        .bind('Repository')
        .to(TaskRepository_1.TaskRepository)
        .inSingletonScope()
        .whenTargetNamed('TaskRepository');
    container
        .bind('Repository')
        .to(TodoRepository_1.TodoRepository)
        .inSingletonScope()
        .whenTargetNamed('TodoRepository');
    container
        .bind('Repository')
        .to(CategoryRepository_1.CategoryRepository)
        .inSingletonScope()
        .whenTargetNamed('CategoryRepository');
    const connection = await DbConnectionManager_1.DbConnectionManager.createConnection();
    container.bind('Connection').toConstantValue(connection).whenTargetNamed('NoSQL');
}
exports.bind = bind;
async function unbind(container) {
    await container.getNamed('Connection', 'NoSQL').close();
    container.unbindAll();
}
exports.unbind = unbind;
