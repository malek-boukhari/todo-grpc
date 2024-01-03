"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const inversify_1 = require("inversify");
const Todo_1 = require("../entities/Todo");
let TodoRepository = class TodoRepository {
    async findOneById(id) {
        const todo = await Todo_1.TodoModel.findById(id);
        if (!todo) {
            return null;
        }
        return this.mapTodoToPlainObject(todo);
    }
    async findByTaskId(taskId) {
        const todos = await Todo_1.TodoModel.find({ task: taskId });
        return todos.map(todo => this.mapTodoToPlainObject(todo));
    }
    async createOne(todo) {
        const todoDb = new Todo_1.TodoModel({
            title: todo.title,
            status: todo.status,
            priority: todo.priority,
            updatedBy: todo.updatedBy,
            task: todo.task
        });
        const createdTodo = await todoDb.save();
        return {
            ...createdTodo.toObject(),
            _id: createdTodo._id.toString()
        };
    }
    async updateOne(todoId, updateFields) {
        const updatedTodo = await Todo_1.TodoModel.findOneAndUpdate({ _id: todoId }, { $set: { ...updateFields } }, { returnOriginal: false });
        return this.mapTodoToPlainObject(updatedTodo);
    }
    async deleteOne(id) {
        return Todo_1.TodoModel.deleteOne({ _id: id });
    }
    async deleteMany(taskId) {
        return Todo_1.TodoModel.deleteMany({ task: taskId });
    }
    mapTodoToPlainObject(todo) {
        return {
            _id: todo._id.toString(),
            title: todo.title,
            status: todo.status,
            priority: todo.priority,
            updatedBy: todo.updatedBy.toString(),
            task: todo.task.toString(),
            createdAt: todo.createdAt.toISOString(),
            updatedAt: todo.updatedAt.toISOString()
        };
    }
};
exports.TodoRepository = TodoRepository;
exports.TodoRepository = TodoRepository = __decorate([
    (0, inversify_1.injectable)()
], TodoRepository);
