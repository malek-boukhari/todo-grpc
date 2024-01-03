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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const inversify_1 = require("inversify");
const grpc = __importStar(require("@grpc/grpc-js"));
const TaskHandler_1 = require("../handlers/TaskHandler");
let TaskService = class TaskService {
    constructor(taskHandler) {
        this.taskHandler = taskHandler;
    }
    async GetLastUpdatedTasks(call, callback) {
        const req = call.request;
        const tasks = await this.taskHandler.getLastUpdatedTasks(req);
        if (!tasks) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error'
            });
            return;
        }
        callback(null, tasks);
    }
    async GetTasks(call, callback) {
        const req = call.request;
        const tasks = await this.taskHandler.getTasks(req);
        if (!tasks) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error'
            });
            return;
        }
        callback(null, tasks);
    }
    async GetTask(call, callback) {
        const req = call.request;
        const task = await this.taskHandler.getTask(req);
        if (!task) {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Task not found'
            });
            return;
        }
        callback(null, task);
    }
    async CreateTask(call, callback) {
        const req = call.request;
        const createdTask = await this.taskHandler.createTask(req);
        if (!createdTask) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error'
            });
            return;
        }
        callback(null, createdTask);
    }
    async UpdateTask(call, callback) {
        const req = call.request;
        const updatedTask = await this.taskHandler.updateTask(req);
        if (!updatedTask) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error'
            });
            return;
        }
        callback(null, updatedTask);
    }
    async DeleteTask(call, callback) {
        const req = call.request;
        const isDeleted = await this.taskHandler.deleteTask(req);
        callback(null, isDeleted);
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('Handler')),
    __param(0, (0, inversify_1.named)('TaskHandler')),
    __metadata("design:paramtypes", [TaskHandler_1.TaskHandler])
], TaskService);
