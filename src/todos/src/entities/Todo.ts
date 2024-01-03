import mongoose, { Document, Schema } from 'mongoose';
import { todo_package } from '../generated/todo';
import TodoPriority = todo_package.TodoPriority;
import TodoStatus = todo_package.TodoStatus;

export type ITodoStatus = TodoStatus;
type ITodoPriority = TodoPriority;

interface TodoCreation {
    title: string;
    status: ITodoStatus;
    priority: ITodoPriority;
    updatedBy: mongoose.Types.ObjectId | string; // Reference to User document
    task: mongoose.Types.ObjectId | string; // Reference to Task document
}

interface ITodo {
    _id: string;
    title: string;
    status: ITodoStatus;
    priority: ITodoPriority;
    updatedBy: string; // Reference to User document
    task: string; // Reference to Task document
    createdAt: string;
    updatedAt: string;
}

export interface TodoDocument extends Document, TodoCreation {}

const todoSchema = new Schema<TodoDocument>(
    {
        title: { type: String, required: true },
        status: { type: Number, required: true, enum: [0, 1, 2, 3] },
        priority: { type: Number, required: true, enum: [0, 1, 2, 3] },
        task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
        updatedBy: { type: Schema.Types.ObjectId, ref: 'USER', required: true }
    },
    { timestamps: true }
);

const TodoModel = mongoose.model<TodoDocument>('Todo', todoSchema);

export { TodoModel, ITodo };
