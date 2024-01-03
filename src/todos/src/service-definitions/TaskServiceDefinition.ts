import { Container } from 'inversify';
import { TaskService } from '../services/TaskService';
import { task_package } from '../generated/task';

export const TaskServiceDefinition = (
    container: Container
): task_package.UnimplementedTaskServiceService => {
    const taskService = container.getNamed<TaskService>('Service', 'TaskService');

    return {
        GetTasks: (call, callback) => taskService.GetTasks(call, callback),
        GetLastUpdatedTasks: (call, callback) => taskService.GetLastUpdatedTasks(call, callback),
        GetTask: (call, callback) => taskService.GetTask(call, callback),
        CreateTask: (call, callback) => taskService.CreateTask(call, callback),
        UpdateTask: (call, callback) => taskService.UpdateTask(call, callback),
        DeleteTask: (call, callback) => taskService.DeleteTask(call, callback)
    };
};
