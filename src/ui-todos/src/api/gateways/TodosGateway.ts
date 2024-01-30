import { createGrpcWebTransport } from '@connectrpc/connect-web';
import { createPromiseClient } from '@connectrpc/connect';
import { TodoService } from '../../generated/todo_connect.ts';
import {
    Todo,
    GetTodoRequest,
    GetTodosRequest,
    GetTodosResponse,
    UpdateTodoRequest,
    DeleteTodoRequest,
    DeleteTodoResponse,
    CreateTodoRequest
} from '../../generated/todo_pb.ts';
import type { PromiseClient, Transport } from '@connectrpc/connect';

export class TodosGateway {
    private readonly transport: Transport;
    private client: PromiseClient<typeof TodoService>;

    constructor() {
        this.transport = createGrpcWebTransport({
            baseUrl: import.meta.env.VITE_TODOS_BASE_URL
        });
        this.client = createPromiseClient(TodoService, this.transport);
    }

    async getTodo(todoId: string): Promise<Todo | null> {
        try {
            const request = new GetTodoRequest({ Id: todoId });

            return await this.client.getTodo(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getTodos(taskId: string, title: string): Promise<GetTodosResponse | null> {
        try {
            const request = new GetTodosRequest({ taskId, title });

            return await this.client.getTodos(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async createTodo(data: any): Promise<Todo | null> {
        try {
            const request = new CreateTodoRequest(data);

            return await this.client.createTodo(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async updateTodo(todoId: string, data: UpdateTodoRequest): Promise<Todo | null> {
        try {
            const request = new UpdateTodoRequest({ Id: todoId, todo: data });

            return await this.client.updateTodo(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async deleteTodo(todoId: string): Promise<DeleteTodoResponse | null> {
        try {
            const request = new DeleteTodoRequest({ Id: todoId });

            return await this.client.deleteTodo(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
