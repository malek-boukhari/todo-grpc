import { injectable } from 'inversify';
import mongoose from 'mongoose';
import { TaskModel, IPopulatedTask, ITask } from '../entities/Task';
import { IUser } from '../entities/User';

@injectable()
export class TaskRepository {
    constructor() {
        // Pass
    }

    // Checks whether at least one task has been associated with a specific category
    public async categoryHasTasks(categoryId: string): Promise<boolean> {
        const count = await TaskModel.countDocuments({ category: categoryId });

        return count > 0;
    }

    public async findOneById(id: string): Promise<IPopulatedTask | null> {
        const task = await TaskModel.findById(id).populate('collaborators').populate('category');
        if (!task) {
            return null;
        }

        return this.mapTaskToPlainObject(task);
    }

    public async findByOwner(userId: string): Promise<any[]> {
        return TaskModel.find({ user: userId }).select('_id');
    }

    public async findByCollaborator(
        collaboratorId: string,
        title: string,
        sortCriteria: { [key: string]: 1 | -1 }
    ): Promise<IPopulatedTask[]> {
        const tasks = await TaskModel.find({
            collaborators: collaboratorId,
            title: { $regex: '^' + title, $options: 'i' }
        })
            .sort(sortCriteria)
            .populate('collaborators')
            .populate('category');

        return tasks.map(this.mapTaskToPlainObject);
    }

    public async findLastUpdatedTasks(collaboratorId: string): Promise<IPopulatedTask[]> {
        const tasks = await TaskModel.find({ collaborators: collaboratorId })
            .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
            .limit(4) // Limit the result to the first 4 tasks
            .populate('collaborators')
            .populate('category');

        return tasks.map(this.mapTaskToPlainObject);
    }

    public async createOne(task: any): Promise<any> {
        const taskDb = new TaskModel({
            title: task.title,
            description: task.description,
            category: task.category,
            user: task.user,
            collaborators: task.collaborators
        });
        const createdTask = await taskDb.save();

        return {
            ...createdTask.toObject(),
            _id: createdTask._id.toString(),
            user: createdTask.user.toString(),
            collaborators: createdTask.collaborators.map(id => id.toString()),
            category: createdTask.category.toString()
        };
    }

    public async updateOne(taskId: string, updateFields: any): Promise<ITask> {
        const updatedTask = await TaskModel.findOneAndUpdate(
            { _id: taskId },
            {
                description: updateFields.description,
                title: updateFields.title,
                category: updateFields.category,
                collaborators: updateFields.collaborators
            },
            { returnOriginal: false }
        )
            .populate('todos')
            .populate('category');

        return {
            ...updatedTask.toObject(),
            _id: updatedTask._id.toString(),
            collaborators: updatedTask.collaborators.map(id => id.toString()),
            user: updatedTask.user.toString(),
            category: updatedTask.category.toString()
        };
    }

    public async deleteOne(id: string): Promise<any> {
        return TaskModel.deleteOne({ _id: id });
    }

    public async deleteMany(userId: string): Promise<any> {
        return TaskModel.deleteMany({ user: userId });
    }

    // Maps a Mongoose document to a plain js object
    private mapTaskToPlainObject(task: any): IPopulatedTask {
        const mappedTask: IPopulatedTask = {
            _id: task._id.toString(),
            title: task.title,
            description: task.description,
            user: task.user.toString(),
            createdAt: task.createdAt?.toISOString() ?? '',
            updatedAt: task.updatedAt?.toISOString() ?? '',
            collaborators: task.collaborators.map((collaborator: IUser) => {
                return {
                    _id: collaborator._id.toString(),
                    username: collaborator.username,
                    email: collaborator.email,
                    avatar: collaborator.avatar ?? ''
                };
            }),
            todos: task.todos.map((todoId: string) => ({
                _id: todoId.toString()
            }))
        };

        if (task.category) {
            mappedTask.category = {
                _id: task.category._id.toString(),
                name: task.category.name,
                color: task.category.color,
                user: task.category.user.toString()
            };
        }
        return mappedTask;
    }
}
