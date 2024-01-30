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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const inversify_1 = require("inversify");
const Task_1 = require("../entities/Task");
let TaskRepository = class TaskRepository {
    constructor() {
    }
    async categoryHasTasks(categoryId) {
        const count = await Task_1.TaskModel.countDocuments({ category: categoryId });
        return count > 0;
    }
    async findOneById(id) {
        const task = await Task_1.TaskModel.findById(id).populate('collaborators').populate('category');
        if (!task) {
            return null;
        }
        return this.mapTaskToPlainObject(task);
    }
    async findByOwner(userId) {
        return Task_1.TaskModel.find({ user: userId }).select('_id');
    }
    async findByCollaborator(collaboratorId, title, sortCriteria) {
        const tasks = await Task_1.TaskModel.find({
            collaborators: collaboratorId,
            title: { $regex: '^' + title, $options: 'i' }
        })
            .sort(sortCriteria)
            .populate('collaborators')
            .populate('category');
        return tasks.map(this.mapTaskToPlainObject);
    }
    async findLastUpdatedTasks(collaboratorId) {
        const tasks = await Task_1.TaskModel.find({ collaborators: collaboratorId })
            .sort({ updatedAt: -1 })
            .limit(4)
            .populate('collaborators')
            .populate('category');
        return tasks.map(this.mapTaskToPlainObject);
    }
    async createOne(task) {
        const taskDb = new Task_1.TaskModel({
            title: task.title,
            description: task.description,
            category: task.category,
            user: task.user,
            collaborators: task.collaborators
        });
        const createdTask = await taskDb.save();
        return {
            ...createdTask.toObject(),
            _id: createdTask._id.toString(),
            user: createdTask.user.toString(),
            collaborators: createdTask.collaborators.map(id => id.toString()),
            category: createdTask.category.toString()
        };
    }
    async updateOne(taskId, updateFields) {
        const updatedTask = await Task_1.TaskModel.findOneAndUpdate({ _id: taskId }, {
            description: updateFields.description,
            title: updateFields.title,
            category: updateFields.category,
            collaborators: updateFields.collaborators
        }, { returnOriginal: false })
            .populate('todos')
            .populate('category');
        return {
            ...updatedTask.toObject(),
            _id: updatedTask._id.toString(),
            collaborators: updatedTask.collaborators.map(id => id.toString()),
            user: updatedTask.user.toString(),
            category: updatedTask.category.toString()
        };
    }
    async deleteOne(id) {
        return Task_1.TaskModel.deleteOne({ _id: id });
    }
    async deleteMany(userId) {
        return Task_1.TaskModel.deleteMany({ user: userId });
    }
    mapTaskToPlainObject(task) {
        var _a, _b, _c, _d;
        const mappedTask = {
            _id: task._id.toString(),
            title: task.title,
            description: task.description,
            user: task.user.toString(),
            createdAt: (_b = (_a = task.createdAt) === null || _a === void 0 ? void 0 : _a.toISOString()) !== null && _b !== void 0 ? _b : '',
            updatedAt: (_d = (_c = task.updatedAt) === null || _c === void 0 ? void 0 : _c.toISOString()) !== null && _d !== void 0 ? _d : '',
            collaborators: task.collaborators.map((collaborator) => {
                var _a;
                return {
                    _id: collaborator._id.toString(),
                    username: collaborator.username,
                    email: collaborator.email,
                    avatar: (_a = collaborator.avatar) !== null && _a !== void 0 ? _a : ''
                };
            }),
            todos: task.todos.map((todoId) => ({
                _id: todoId.toString()
            }))
        };
        if (task.category) {
            mappedTask.category = {
                _id: task.category._id.toString(),
                name: task.category.name,
                color: task.category.color,
                user: task.category.user.toString()
            };
        }
        return mappedTask;
    }
};
exports.TaskRepository = TaskRepository;
exports.TaskRepository = TaskRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], TaskRepository);
