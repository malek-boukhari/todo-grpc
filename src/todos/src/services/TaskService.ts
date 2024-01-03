import { inject, injectable, named } from 'inversify';
import * as grpc from '@grpc/grpc-js';
import { task_package as tspkg } from '../generated/task';
import { TaskHandler } from '../handlers/TaskHandler';
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';

@injectable()
export class TaskService {
    constructor(
        @inject('Handler')
        @named('TaskHandler')
        private taskHandler: TaskHandler
    ) {
        // empty
    }

    public async GetLastUpdatedTasks(
        call: ServerUnaryCall<tspkg.GetLastUpdatedTasksRequest, tspkg.GetTasksResponse>,
        callback: sendUnaryData<tspkg.GetTasksResponse>
    ): Promise<void> {
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

    public async GetTasks(
        call: ServerUnaryCall<tspkg.GetTasksRequest, tspkg.GetTasksResponse>,
        callback: sendUnaryData<tspkg.GetTasksResponse>
    ): Promise<void> {
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

    public async GetTask(
        call: ServerUnaryCall<tspkg.GetTaskRequest, tspkg.GetTaskResponse>,
        callback: sendUnaryData<tspkg.GetTaskResponse>
    ): Promise<void> {
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

    public async CreateTask(
        call: ServerUnaryCall<tspkg.CreateTaskRequest, tspkg.Task>,
        callback: sendUnaryData<tspkg.Task>
    ): Promise<void> {
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

    public async UpdateTask(
        call: ServerUnaryCall<tspkg.UpdateTaskRequest, tspkg.Task>,
        callback: sendUnaryData<tspkg.Task>
    ): Promise<void> {
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

    public async DeleteTask(
        call: ServerUnaryCall<tspkg.DeleteTaskRequest, tspkg.DeleteTaskResponse>,
        callback: sendUnaryData<tspkg.DeleteTaskResponse>
    ): Promise<void> {
        const req = call.request;
        const isDeleted = await this.taskHandler.deleteTask(req);

        callback(null, isDeleted);
    }
}
