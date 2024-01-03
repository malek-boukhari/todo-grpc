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
exports.LabelRepository = void 0;
const inversify_1 = require("inversify");
const Label_1 = require("../entities/Label");
let LabelRepository = class LabelRepository {
    constructor() {
    }
    async getLabelsByOwner(ownerId) {
        const labels = await Label_1.LabelModel.find({ owner: ownerId });
        return labels.map(label => ({
            _id: label._id.toString(),
            label: label.label,
            color: label.color,
            owner: label.owner.toString()
        }));
    }
    async createOne(data) {
        const labelDb = new Label_1.LabelModel(data);
        const createdLabel = await labelDb.save();
        return {
            ...createdLabel.toObject(),
            _id: createdLabel._id.toString()
        };
    }
    async updateOne(labelId, updateFields) {
        const label = await Label_1.LabelModel.findOneAndUpdate({ _id: labelId }, { $set: { ...updateFields } }, { returnOriginal: false });
        return {
            _id: label._id.toString(),
            label: label.label,
            color: label.color,
            owner: label.owner.toString()
        };
    }
    async deleteOne(id) {
        return Label_1.LabelModel.deleteOne({ _id: id });
    }
};
exports.LabelRepository = LabelRepository;
exports.LabelRepository = LabelRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], LabelRepository);
