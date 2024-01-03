import { Container } from 'inversify';
import { TodoService } from '../services/TodoService';
import { todo_package } from '../generated/todo';

export const TodoServiceDefinition = (
    container: Container
): todo_package.UnimplementedTodoServiceService => {
    const todoService = container.getNamed<TodoService>('Service', 'TodoService');

    return {
        GetTodos: (call, callback) => todoService.GetTodos(call, callback),
        GetTodo: (call, callback) => todoService.GetTodo(call, callback),
        CreateTodo: (call, callback) => todoService.CreateTodo(call, callback),
        UpdateTodo: (call, callback) => todoService.UpdateTodo(call, callback),
        DeleteTodo: (call, callback) => todoService.DeleteTodo(call, callback)
    };
};
