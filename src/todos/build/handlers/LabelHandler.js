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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelHandler = void 0;
const inversify_1 = require("inversify");
const label_1 = require("../generated/label");
const CategoryRepository_1 = require("../repositories/CategoryRepository");
let LabelHandler = class LabelHandler {
    constructor(labelRepository, logger) {
        this.labelRepository = labelRepository;
        this.logger = logger;
    }
    async getLabels(req) {
        const ownerId = req.userId;
        const labels = await this.labelRepository.getLabelsByOwner(ownerId);
        return label_1.label_package.GetLabelsResponse.fromObject({ labels });
    }
    async createLabel(req) {
        try {
            const labelObj = req.toObject();
            const createdLabel = await this.labelRepository.createOne(labelObj);
            return label_1.label_package.Label.fromObject(createdLabel);
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async updateLabel(req) {
        const labelId = req._id;
        const labelObj = req.label.toObject();
        try {
            const updatedLabel = await this.labelRepository.updateOne(labelId, labelObj);
            return label_1.label_package.Label.fromObject(updatedLabel);
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async deleteLabel(req) {
        const labelId = req._id;
        try {
            const isDeleted = await this.labelRepository.deleteOne(labelId);
            return label_1.label_package.DeleteLabelResponse.fromObject({ success: isDeleted });
        }
        catch (e) {
            this.logger.error(e);
            return label_1.label_package.DeleteLabelResponse.fromObject({ success: false });
        }
    }
};
exports.LabelHandler = LabelHandler;
exports.LabelHandler = LabelHandler = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('Repository')),
    __param(0, (0, inversify_1.named)('LabelRepository')),
    __param(1, (0, inversify_1.inject)('Logger')),
    __param(1, (0, inversify_1.named)('Logger')),
    __metadata("design:paramtypes", [CategoryRepository_1.CategoryRepository, Object])
], LabelHandler);
