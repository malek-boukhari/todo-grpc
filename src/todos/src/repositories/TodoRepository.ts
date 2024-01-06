import { injectable } from 'inversify';
import { TodoModel, ITodo } from '../entities/Todo';
import { TaskModel } from '../entities/Task';

@injectable()
export class TodoRepository {
    public async findOneById(id: string): Promise<ITodo | null> {
        const todo = await TodoModel.findById(id);
        if (!todo) {
            return null;
        }

        return this.mapTodoToPlainObject(todo);
    }

    public async findByTaskId(taskId: string): Promise<ITodo[]> {
        const todos = await TodoModel.find({ task: taskId });

        return todos.map(todo => this.mapTodoToPlainObject(todo));
    }

    public async createOne(todo: any): Promise<any> {
        const todoDb = new TodoModel({
            title: todo.title,
            status: todo.status,
            priority: todo.priority,
            updatedBy: todo.updatedBy,
            task: todo.task
        });
        const createdTodo = await todoDb.save();

        // Find the corresponding Task and update its updatedAt
        await this.setTaskUpdatedAt(createdTodo.task);

        return {
            ...createdTodo.toObject(),
            _id: createdTodo._id.toString()
        };
    }

    public async updateOne(todoId: string, updateFields: any): Promise<any> {
        const updatedTodo = await TodoModel.findOneAndUpdate(
            { _id: todoId },
            { $set: { ...updateFields } },
            { returnOriginal: false }
        );

        // Find the corresponding Task and update its updatedAt
        await this.setTaskUpdatedAt(updatedTodo.task);

        return this.mapTodoToPlainObject(updatedTodo);
    }

    public async deleteOne(id: string): Promise<any> {
        return TodoModel.deleteOne({ _id: id });
    }

    public async deleteMany(taskId: string): Promise<any> {
        return TodoModel.deleteMany({ task: taskId });
    }

    private mapTodoToPlainObject(todo: any) {
        return {
            _id: todo._id.toString(),
            title: todo.title,
            status: todo.status,
            priority: todo.priority,
            updatedBy: todo.updatedBy.toString(),
            task: todo.task.toString(),
            createdAt: todo.createdAt.toISOString(),
            updatedAt: todo.updatedAt.toISOString()
        };
    }

    // Updates the updatedAt field of the task
    private async setTaskUpdatedAt(taskId: any): Promise<void> {
        await TaskModel.updateOne({ _id: taskId }, { updatedAt: new Date() });
    }
}
