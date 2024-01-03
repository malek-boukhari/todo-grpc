"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelServiceDefinition = void 0;
const LabelServiceDefinition = (container) => {
    const labelService = container.getNamed('Service', 'TaskService');
    return {
        GetCategories: (call, callback) => labelService.GetLabels(call, callback),
        CreateCategory: (call, callback) => labelService.CreateLabel(call, callback),
        UpdateCategory: (call, callback) => labelService.UpdateLabel(call, callback),
        DeleteCategory: (call, callback) => labelService.DeleteLabel(call, callback)
    };
};
exports.LabelServiceDefinition = LabelServiceDefinition;
