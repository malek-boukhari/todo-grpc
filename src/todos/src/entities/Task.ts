import mongoose, { Document, Schema } from 'mongoose';
import { ITodo } from './Todo';
import { ICategory } from './Category';
import { IUser } from './User';

interface TaskCreation {
    title: string;
    description: string;
    user: mongoose.Types.ObjectId | string; // Reference to User document (FIXME: change to owner)
    category?: mongoose.Types.ObjectId | string; // Reference to Category document
    collaborators: mongoose.Types.ObjectId[] | string[]; // Reference to User documents
    todos: mongoose.Types.ObjectId[] | string[]; // Reference to Todo documents
}

interface ITask extends Omit<TaskCreation, 'user' | 'category' | 'collaborators' | 'todos'> {
    _id: string;
    user: string;
    collaborators: string[];
    todos: string[];
    category: string;
}

interface IPopulatedTask {
    _id: string;
    title: string;
    description: string;
    user: string;
    category?: ICategory;
    collaborators: IUser[];
    todos: string[];
    createdAt: string;
    updatedAt: string;
}

export interface TaskDocument extends Document, TaskCreation {}

const taskSchema = new Schema<TaskDocument>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
        collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
    },
    { timestamps: true }
);

const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);

export { TaskModel, ITask, IPopulatedTask };
