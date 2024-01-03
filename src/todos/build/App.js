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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const grpc = __importStar(require("@grpc/grpc-js"));
const bind_1 = require("./bind");
const UserServiceDefinition_1 = require("./service-definitions/UserServiceDefinition");
const TaskServiceDefinition_1 = require("./service-definitions/TaskServiceDefinition");
const TodoServiceDefinition_1 = require("./service-definitions/TodoServiceDefinition");
const user_1 = require("./generated/user");
const task_1 = require("./generated/task");
const todo_1 = require("./generated/todo");
const category_1 = require("./generated/category");
const CategoryServiceDefinition_1 = require("./service-definitions/CategoryServiceDefinition");
class App {
    constructor(port = 8009) {
        this.port =
            process.env.DEFAULT_PORT !== undefined ? parseInt(process.env.DEFAULT_PORT) : port;
        this.container = new inversify_1.Container();
        this.server = new grpc.Server();
        this.services = [
            {
                definition: user_1.user_package.UnimplementedUserServiceService.definition,
                implementation: UserServiceDefinition_1.UserServiceDefinition
            },
            {
                definition: task_1.task_package.UnimplementedTaskServiceService.definition,
                implementation: TaskServiceDefinition_1.TaskServiceDefinition
            },
            {
                definition: todo_1.todo_package.UnimplementedTodoServiceService.definition,
                implementation: TodoServiceDefinition_1.TodoServiceDefinition
            },
            {
                definition: category_1.category_package.UnimplementedCategoryServiceService.definition,
                implementation: CategoryServiceDefinition_1.CategoryServiceDefinition
            }
        ];
    }
    async start() {
        await (0, bind_1.bind)(this.container);
        const logger = this.container.getNamed('Logger', 'Logger');
        const connection = this.container.getNamed('Connection', 'NoSQL');
        if (process.env.NODE_ENV === 'dev') {
            connection.set('debug', true);
        }
        logger.info(`⚡ Connection to ${connection.name} established successfully`);
        this.services.map(service => {
            this.server.addService(service.definition, service.implementation(this.container));
        });
        this.server.bindAsync(`0.0.0.0:${this.port}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
            if (error) {
                logger.error(port);
                logger.error(error);
            }
            this.server.start();
            logger.info(`⚡ Server is up & running on port ${port}`);
        });
    }
    async stop() {
        await (0, bind_1.unbind)(this.container);
    }
}
exports.App = App;
