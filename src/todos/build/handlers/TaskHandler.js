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
exports.TaskHandler = void 0;
const inversify_1 = require("inversify");
const task_1 = require("../generated/task");
const TaskRepository_1 = require("../repositories/TaskRepository");
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const TodoRepository_1 = require("../repositories/TodoRepository");
let TaskHandler = class TaskHandler {
    constructor(taskRepository, categoryRepository, todoRepository, logger) {
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
        this.todoRepository = todoRepository;
        this.logger = logger;
    }
    async getTasks(req) {
        try {
            const collaboratorId = req.collaboratorId;
            const title = req.title;
            const tasks = await this.taskRepository.findByCollaborator(collaboratorId, title);
            return task_1.task_package.GetTasksResponse.fromObject({ tasks });
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async getLastUpdatedTasks(req) {
        try {
            const collaboratorId = req.collaboratorId;
            const tasks = await this.taskRepository.findLastUpdatedTasks(collaboratorId);
            return task_1.task_package.GetTasksResponse.fromObject({ tasks });
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async getTask(req) {
        try {
            const taskId = req._id;
            const task = await this.taskRepository.findOneById(taskId);
            return task ? task_1.task_package.GetTaskResponse.fromObject({ task }) : null;
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async createTask(req) {
        try {
            const taskObj = req.toObject();
            const categoryExists = this.categoryRepository.exists(taskObj.category);
            if (!categoryExists) {
                return null;
            }
            if (!taskObj.collaborators.includes(taskObj.user)) {
                taskObj.collaborators.push(taskObj.user);
            }
            const createdTask = await this.taskRepository.createOne(taskObj);
            return task_1.task_package.Task.fromObject(createdTask);
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async updateTask(req) {
        const taskId = req._id;
        const taskObj = req.task.toObject();
        try {
            const categoryExists = this.categoryRepository.exists(taskObj.category);
            if (!categoryExists) {
                return null;
            }
            const updatedTask = await this.taskRepository.updateOne(taskId, taskObj);
            return task_1.task_package.Task.fromObject(updatedTask);
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async deleteTask(req) {
        const taskId = req._id;
        try {
            await this.todoRepository.deleteMany(taskId);
            const isDeleted = await this.taskRepository.deleteOne(taskId);
            return task_1.task_package.DeleteTaskResponse.fromObject({ success: isDeleted.acknowledged });
        }
        catch (e) {
            this.logger.error(e);
            return task_1.task_package.DeleteTaskResponse.fromObject({ success: false });
        }
    }
};
exports.TaskHandler = TaskHandler;
exports.TaskHandler = TaskHandler = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('Repository')),
    __param(0, (0, inversify_1.named)('TaskRepository')),
    __param(1, (0, inversify_1.inject)('Repository')),
    __param(1, (0, inversify_1.named)('CategoryRepository')),
    __param(2, (0, inversify_1.inject)('Repository')),
    __param(2, (0, inversify_1.named)('TodoRepository')),
    __param(3, (0, inversify_1.inject)('Logger')),
    __param(3, (0, inversify_1.named)('Logger')),
    __metadata("design:paramtypes", [TaskRepository_1.TaskRepository,
        CategoryRepository_1.CategoryRepository,
        TodoRepository_1.TodoRepository, Object])
], TaskHandler);
