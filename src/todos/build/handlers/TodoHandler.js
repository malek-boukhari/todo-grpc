"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoHandler = void 0;
const inversify_1 = require("inversify");
const todo_1 = require("../generated/todo");
const TodoRepository_1 = require("../repositories/TodoRepository");
let TodoHandler = class TodoHandler {
    constructor(todoRepository, logger) {
        this.todoRepository = todoRepository;
        this.logger = logger;
    }
    async getTodos(req) {
        try {
            const { taskId, title } = req;
            const todos = await this.todoRepository.findByTaskId(taskId, title);
            return todo_1.todo_package.GetTodosResponse.fromObject({ todos });
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async createTodo(req) {
        try {
            const todoObj = req.toObject();
            const createdTodo = await this.todoRepository.createOne(todoObj);
            return todo_1.todo_package.Todo.fromObject(createdTodo);
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async updateTodo(req) {
        const todoId = req._id;
        const todoObj = req.todo.toObject();
        try {
            const updatedTodo = await this.todoRepository.updateOne(todoId, todoObj);
            return todo_1.todo_package.Todo.fromObject(updatedTodo);
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async deleteTodo(req) {
        const todoId = req._id;
        try {
            const isDeleted = await this.todoRepository.deleteOne(todoId);
            return todo_1.todo_package.DeleteTodoResponse.fromObject({ success: isDeleted.acknowledged });
        }
        catch (e) {
            this.logger.error(e);
            return todo_1.todo_package.DeleteTodoResponse.fromObject({ success: false });
        }
    }
};
exports.TodoHandler = TodoHandler;
exports.TodoHandler = TodoHandler = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('Repository')),
    __param(0, (0, inversify_1.named)('TodoRepository')),
    __param(1, (0, inversify_1.inject)('Logger')),
    __param(1, (0, inversify_1.named)('Logger')),
    __metadata("design:paramtypes", [TodoRepository_1.TodoRepository, Object])
], TodoHandler);
