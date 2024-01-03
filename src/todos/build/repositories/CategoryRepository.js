"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const inversify_1 = require("inversify");
const Category_1 = require("../entities/Category");
let CategoryRepository = class CategoryRepository {
    constructor() {
    }
    async exists(categoryId) {
        const count = await Category_1.CategoryModel.countDocuments({ _id: categoryId });
        return count > 0;
    }
    async nameExists(userId, name) {
        const count = await Category_1.CategoryModel.countDocuments({ user: userId, name });
        return count > 0;
    }
    async getCategoriesByOwner(userId) {
        const categories = await Category_1.CategoryModel.find({ user: userId });
        return categories.map(category => ({
            _id: category._id.toString(),
            name: category.name,
            color: category.color,
            user: category.user.toString()
        }));
    }
    async createOne(data) {
        const categoryDb = new Category_1.CategoryModel(data);
        const createdCategory = await categoryDb.save();
        return {
            ...createdCategory.toObject(),
            _id: createdCategory._id.toString(),
            user: createdCategory.user.toString()
        };
    }
    async updateOne(categoryId, updateFields) {
        const category = await Category_1.CategoryModel.findOneAndUpdate({ _id: categoryId }, { $set: { ...updateFields } }, { returnOriginal: false });
        return {
            _id: category._id.toString(),
            name: category.name,
            color: category.color,
            user: category.user.toString()
        };
    }
    async deleteOne(id) {
        return Category_1.CategoryModel.deleteOne({ _id: id });
    }
    async deleteMany(user) {
        return Category_1.CategoryModel.deleteMany({ user });
    }
};
exports.CategoryRepository = CategoryRepository;
exports.CategoryRepository = CategoryRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], CategoryRepository);
