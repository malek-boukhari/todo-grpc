import { createGrpcWebTransport } from '@connectrpc/connect-web';
import { createPromiseClient } from '@connectrpc/connect';
import { TaskService } from '../../generated/task_connect.ts';
import {
    GetTasksResponse,
    GetTaskRequest,
    Task,
    UpdateTaskRequest,
    DeleteTaskRequest,
    DeleteTaskResponse,
    GetTasksRequest,
    GetTaskResponse,
    CreateTaskRequest,
    GetLastUpdatedTasksRequest
} from '../../generated/task_pb.ts';
import type { PromiseClient, Transport } from '@connectrpc/connect';

export class TasksGateway {
    private readonly transport: Transport;
    private client: PromiseClient<typeof TaskService>;

    constructor() {
        this.transport = createGrpcWebTransport({
            baseUrl: import.meta.env.VITE_TODOS_BASE_URL
        });
        this.client = createPromiseClient(TaskService, this.transport);
    }

    async getTasks(userId: string, title: string): Promise<GetTasksResponse | null> {
        try {
            const request = new GetTasksRequest({ collaboratorId: userId, title });

            return await this.client.getTasks(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getLastUpdatedTasks(userId: string): Promise<GetTasksResponse | null> {
        try {
            const request = new GetLastUpdatedTasksRequest({ collaboratorId: userId });

            return await this.client.getLastUpdatedTasks(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getTask(taskId: string): Promise<GetTaskResponse | null> {
        try {
            const request = new GetTaskRequest({ Id: taskId });

            return await this.client.getTask(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async createTask(data: any): Promise<Task | null> {
        try {
            const request = new CreateTaskRequest(data);

            return await this.client.createTask(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async updateTask(id: string, data: UpdateTaskRequest): Promise<Task | null> {
        try {
            const request = new UpdateTaskRequest({ Id: id, task: data });

            return await this.client.updateTask(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async deleteTask(taskId: string): Promise<DeleteTaskResponse | null> {
        try {
            const request = new DeleteTaskRequest({ Id: taskId });

            return await this.client.deleteTask(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
