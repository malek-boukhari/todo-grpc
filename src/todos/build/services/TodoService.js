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
exports.TodoService = void 0;
const inversify_1 = require("inversify");
const grpc = __importStar(require("@grpc/grpc-js"));
const TodoHandler_1 = require("../handlers/TodoHandler");
let TodoService = class TodoService {
    constructor(todoHandler) {
        this.todoHandler = todoHandler;
    }
    async GetTodos(call, callback) {
        const req = call.request;
        const todos = await this.todoHandler.getTodos(req);
        if (!todos) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error'
            });
            return;
        }
        callback(null, todos);
    }
    async GetTodo(call, callback) {
    }
    async CreateTodo(call, callback) {
        const req = call.request;
        const createdTodo = await this.todoHandler.createTodo(req);
        if (!createdTodo) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error'
            });
            return;
        }
        callback(null, createdTodo);
    }
    async UpdateTodo(call, callback) {
        const req = call.request;
        const updatedTodo = await this.todoHandler.updateTodo(req);
        if (!updatedTodo) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error'
            });
            return;
        }
        callback(null, updatedTodo);
    }
    async DeleteTodo(call, callback) {
        const req = call.request;
        const isDeleted = await this.todoHandler.deleteTodo(req);
        callback(null, isDeleted);
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('Handler')),
    __param(0, (0, inversify_1.named)('TodoHandler')),
    __metadata("design:paramtypes", [TodoHandler_1.TodoHandler])
], TodoService);
