import { inject, injectable, named } from 'inversify';
import { Logger } from 'log4js';
import { task_package } from '../generated/task';
import { TaskRepository } from '../repositories/TaskRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { TodoRepository } from '../repositories/TodoRepository';
import SortOrder = task_package.SortOrder;
import SortBy = task_package.SortBy;

@injectable()
export class TaskHandler {
    constructor(
        @inject('Repository')
        @named('TaskRepository')
        private taskRepository: TaskRepository,
        @inject('Repository')
        @named('CategoryRepository')
        private categoryRepository: CategoryRepository,
        @inject('Repository')
        @named('TodoRepository')
        private todoRepository: TodoRepository,
        @inject('Logger')
        @named('Logger')
        private logger: Logger
    ) {
        // pass
    }

    public async getTasks(
        req: task_package.GetTasksRequest
    ): Promise<task_package.GetTasksResponse> {
        try {
            const collaboratorId: string = req.collaboratorId;
            const { title, sortBy, sortOrder } = req;
            let sort = this.toSortField(sortBy);
            const order = this.toMongooseSortOrder(sortOrder);

            if (!sort) {
                sort = 'title';
            }
            const sortCriteria: { [key: string]: 1 | -1 } = {};
            sortCriteria[sort] = order;
            const tasks = await this.taskRepository.findByCollaborator(collaboratorId, title, sortCriteria);

            // Convert tasks to 'task_package.GetTasksResponse' message and return
            return task_package.GetTasksResponse.fromObject({
                tasks,
                sortBy: this.fromSortField(sort),
                sortOrder: this.fromMongooseSortOrder(order)
            });
        } catch (e) {
            this.logger.error(e);

            return null;
        }
    }

    // Retrieves the last 4 updated tasks for a given collaborator.
    public async getLastUpdatedTasks(
        req: task_package.GetLastUpdatedTasksRequest
    ): Promise<task_package.GetTasksResponse> {
        try {
            const collaboratorId: string = req.collaboratorId;
            const tasks = await this.taskRepository.findLastUpdatedTasks(collaboratorId);

            return task_package.GetTasksResponse.fromObject({ tasks });
        } catch (e) {
            this.logger.error(e);

            return null;
        }
    }

    public async getTask(
        req: task_package.GetTaskRequest
    ): Promise<task_package.GetTaskResponse | null> {
        try {
            const taskId: string = req._id;
            const task = await this.taskRepository.findOneById(taskId);

            // Convert task to 'task_package.Task' message and return
            return task ? task_package.GetTaskResponse.fromObject({ task }) : null;
        } catch (e) {
            this.logger.error(e);

            return null;
        }
    }

    public async createTask(
        req: task_package.CreateTaskRequest
    ): Promise<task_package.Task | null> {
        try {
            const taskObj = req.toObject();

            const categoryExists = this.categoryRepository.exists(taskObj.category);
            if (!categoryExists) {
                return null;
            }

            // Add the user as a collaborator
            if (!taskObj.collaborators.includes(taskObj.user)) {
                taskObj.collaborators.push(taskObj.user);
            }

            const createdTask = await this.taskRepository.createOne(taskObj);

            // Convert created task to 'task_package.Task' message and return
            return task_package.Task.fromObject(createdTask);
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    public async updateTask(
        req: task_package.UpdateTaskRequest
    ): Promise<task_package.Task | null> {
        const taskId: string = req._id;
        const taskObj = req.task.toObject();

        try {
            const categoryExists = this.categoryRepository.exists(taskObj.category);
            if (!categoryExists) {
                return null;
            }

            const updatedTask = await this.taskRepository.updateOne(taskId, taskObj);

            // Convert updated task to 'task_package.Task' message and return
            return task_package.Task.fromObject(updatedTask);
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    public async deleteTask(
        req: task_package.DeleteTaskRequest
    ): Promise<task_package.DeleteTaskResponse> {
        const taskId: string = req._id;

        try {
            // delete the todos
            await this.todoRepository.deleteMany(taskId);
            const isDeleted = await this.taskRepository.deleteOne(taskId);

            // Convert deletion status to 'task_package.DeleteTaskResponse' message and return
            return task_package.DeleteTaskResponse.fromObject({ success: isDeleted.acknowledged });
        } catch (e) {
            this.logger.error(e);
            return task_package.DeleteTaskResponse.fromObject({ success: false });
        }
    }

    // Function to convert SortBy enum to a string representing the field to be sorted
    private toSortField(sortBy: SortBy): string {
        switch (sortBy) {
            case SortBy.TITLE:
                return 'title';
            case SortBy.DATE:
                return 'updatedAt';
            default:
                return 'updatedAt';
        }
    }

    // Function to convert SortOrder enum to numeric value expected by Mongoose
    private toMongooseSortOrder(sortOrder: SortOrder): 1 | -1 {
        switch (sortOrder) {
            case SortOrder.ASCENDING:
                return 1;
            case SortOrder.DESCENDING:
                return -1;
            default:
                return 1;
        }
    }

    // Function to convert string representing the field to SortBy enum
    private fromSortField(sortField: string): SortBy {
        switch (sortField.toLowerCase()) {
            case 'title':
                return SortBy.TITLE;
            case 'date':
                return SortBy.DATE;
            default:
                return SortBy.DATE; // Default to a sensible value
        }
    }

    // Function to convert numeric value expected by Mongoose to SortOrder enum
    private fromMongooseSortOrder(mongooseSortOrder: 1 | -1): SortOrder {
        return mongooseSortOrder === 1 ? SortOrder.ASCENDING : SortOrder.DESCENDING;
    }
}
