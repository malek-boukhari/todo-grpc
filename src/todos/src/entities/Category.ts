import mongoose, { Document, Schema } from 'mongoose';

interface CategoryCreation {
    name: string;
    color: string;
    user: mongoose.Types.ObjectId | string;
}

interface ICategory {
    _id: string;
    name: string;
    color: string;
    user: string;
}

interface CategoryDocument extends Document, CategoryCreation {}

const categorySchema = new Schema<CategoryDocument>({
    name: { type: String, required: true },
    color: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const CategoryModel = mongoose.model<CategoryDocument>('Category', categorySchema);

export { CategoryModel, ICategory };
