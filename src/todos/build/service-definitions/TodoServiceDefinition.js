"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoServiceDefinition = void 0;
const TodoServiceDefinition = (container) => {
    const todoService = container.getNamed('Service', 'TodoService');
    return {
        GetTodos: (call, callback) => todoService.GetTodos(call, callback),
        GetTodo: (call, callback) => todoService.GetTodo(call, callback),
        CreateTodo: (call, callback) => todoService.CreateTodo(call, callback),
        UpdateTodo: (call, callback) => todoService.UpdateTodo(call, callback),
        DeleteTodo: (call, callback) => todoService.DeleteTodo(call, callback)
    };
};
exports.TodoServiceDefinition = TodoServiceDefinition;
