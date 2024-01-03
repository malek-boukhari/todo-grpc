"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskServiceDefinition = void 0;
const TaskServiceDefinition = (container) => {
    const taskService = container.getNamed('Service', 'TaskService');
    return {
        GetTasks: (call, callback) => taskService.GetTasks(call, callback),
        GetLastUpdatedTasks: (call, callback) => taskService.GetLastUpdatedTasks(call, callback),
        GetTask: (call, callback) => taskService.GetTask(call, callback),
        CreateTask: (call, callback) => taskService.CreateTask(call, callback),
        UpdateTask: (call, callback) => taskService.UpdateTask(call, callback),
        DeleteTask: (call, callback) => taskService.DeleteTask(call, callback)
    };
};
exports.TaskServiceDefinition = TaskServiceDefinition;
