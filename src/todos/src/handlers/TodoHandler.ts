import { inject, injectable, named } from 'inversify';
import { Logger } from 'log4js';
import { todo_package } from '../generated/todo';
import { TodoRepository } from '../repositories/TodoRepository';

@injectable()
export class TodoHandler {
    constructor(
        @inject('Repository')
        @named('TodoRepository')
        private todoRepository: TodoRepository,
        @inject('Logger')
        @named('Logger')
        private logger: Logger
    ) {
        // pass
    }

    public async getTodos(req: todo_package.GetTodosRequest) {
        try {
            const taskId = req.taskId;

            const todos = await this.todoRepository.findByTaskId(taskId);
            return todo_package.GetTodosResponse.fromObject({ todos });
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    public async createTodo(
        req: todo_package.CreateTodoRequest
    ): Promise<todo_package.Todo | null> {
        try {
            const todoObj = req.toObject();
            const createdTodo = await this.todoRepository.createOne(todoObj);

            // Convert created todo to 'todo_package.Todo' message and return
            return todo_package.Todo.fromObject(createdTodo);
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    public async updateTodo(
        req: todo_package.UpdateTodoRequest
    ): Promise<todo_package.Todo | null> {
        const todoId: string = req._id;
        const todoObj = req.todo.toObject();

        try {
            const updatedTodo = await this.todoRepository.updateOne(todoId, todoObj);

            // Convert updated todo to 'todo_package.Todo' message and return
            return todo_package.Todo.fromObject(updatedTodo);
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    public async deleteTodo(
        req: todo_package.DeleteTodoRequest
    ): Promise<todo_package.DeleteTodoResponse> {
        const todoId: string = req._id;

        try {
            const isDeleted = await this.todoRepository.deleteOne(todoId);

            // Convert deletion status to 'todo_package.DeleteTodoResponse' message and return
            return todo_package.DeleteTodoResponse.fromObject({ success: isDeleted.acknowledged });
        } catch (e) {
            this.logger.error(e);
            return todo_package.DeleteTodoResponse.fromObject({ success: false });
        }
    }
}
