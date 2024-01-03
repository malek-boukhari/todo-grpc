import { inject, injectable, named } from 'inversify';
import * as grpc from '@grpc/grpc-js';
import { todo_package as tdpkg } from '../generated/todo';
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { TodoHandler } from '../handlers/TodoHandler';

@injectable()
export class TodoService {
    constructor(
        @inject('Handler')
        @named('TodoHandler')
        private todoHandler: TodoHandler
    ) {
        // empty
    }

    public async GetTodos(
        call: ServerUnaryCall<tdpkg.GetTodosRequest, tdpkg.GetTodosResponse>,
        callback: sendUnaryData<tdpkg.GetTodosResponse>
    ): Promise<void> {
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

    public async GetTodo(
        call: ServerUnaryCall<tdpkg.GetTodoRequest, tdpkg.Todo>,
        callback: sendUnaryData<tdpkg.Todo>
    ): Promise<void> {
        // pass
    }

    public async CreateTodo(
        call: ServerUnaryCall<tdpkg.CreateTodoRequest, tdpkg.Todo>,
        callback: sendUnaryData<tdpkg.Todo>
    ): Promise<void> {
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

    public async UpdateTodo(
        call: ServerUnaryCall<tdpkg.UpdateTodoRequest, tdpkg.Todo>,
        callback: sendUnaryData<tdpkg.Todo>
    ): Promise<void> {
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

    public async DeleteTodo(
        call: ServerUnaryCall<tdpkg.DeleteTodoRequest, tdpkg.DeleteTodoResponse>,
        callback: sendUnaryData<tdpkg.DeleteTodoResponse>
    ): Promise<void> {
        const req = call.request;
        const isDeleted = await this.todoHandler.deleteTodo(req);

        callback(null, isDeleted);
    }
}
