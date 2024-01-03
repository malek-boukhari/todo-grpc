import { injectable } from 'inversify';
import { ICategory, CategoryModel } from '../entities/Category';

@injectable()
export class CategoryRepository {
    constructor() {
        // Pass
    }

    public async exists(categoryId: string): Promise<boolean> {
        const count = await CategoryModel.countDocuments({ _id: categoryId });

        return count > 0;
    }

    public async nameExists(userId: string, name: string): Promise<boolean> {
        const count = await CategoryModel.countDocuments({ user: userId, name });

        return count > 0;
    }

    public async getCategoriesByOwner(userId: string): Promise<ICategory[]> {
        const categories = await CategoryModel.find({ user: userId });

        return categories.map(category => ({
            _id: category._id.toString(),
            name: category.name,
            color: category.color,
            user: category.user.toString()
        }));
    }

    public async createOne(data: any): Promise<ICategory> {
        const categoryDb = new CategoryModel(data);
        const createdCategory = await categoryDb.save();

        return {
            ...createdCategory.toObject(),
            _id: createdCategory._id.toString(),
            user: createdCategory.user.toString()
        };
    }

    public async updateOne(categoryId: string, updateFields: any): Promise<ICategory> {
        const category = await CategoryModel.findOneAndUpdate(
            { _id: categoryId },
            { $set: { ...updateFields } },
            { returnOriginal: false }
        );

        return {
            _id: category._id.toString(),
            name: category.name,
            color: category.color,
            user: category.user.toString()
        };
    }

    public async deleteOne(id: string): Promise<any> {
        return CategoryModel.deleteOne({ _id: id });
    }

    public async deleteMany(user: string): Promise<any> {
        return CategoryModel.deleteMany({ user });
    }
}
