"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelService = void 0;
const inversify_1 = require("inversify");
const grpc = __importStar(require("@grpc/grpc-js"));
const LabelHandler_1 = require("../handlers/LabelHandler");
let LabelService = class LabelService {
    constructor(labelHandler) {
        this.labelHandler = labelHandler;
    }
    async GetLabels(call, callback) {
        const req = call.request;
        const labels = await this.labelHandler.getLabels(req);
        if (!labels) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error'
            });
        }
        callback(null, labels);
    }
    async CreateLabel(call, callback) {
        const req = call.request;
        const createdLabel = await this.labelHandler.createLabel(req);
        if (!createdLabel) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error'
            });
        }
        callback(null, createdLabel);
    }
    async UpdateLabel(call, callback) {
        const req = call.request;
        const updatedLabel = await this.labelHandler.updateLabel(req);
        if (!updatedLabel) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'The label could not be updated'
            });
        }
        callback(null, updatedLabel);
    }
    async DeleteLabel(call, callback) {
        const req = call.request;
        const isDeleted = await this.labelHandler.deleteLabel(req);
        const success = { success: isDeleted };
        callback(null, isDeleted);
    }
};
exports.LabelService = LabelService;
exports.LabelService = LabelService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('Handler')),
    __param(0, (0, inversify_1.named)('LabelHandler')),
    __metadata("design:paramtypes", [typeof (_a = typeof LabelHandler_1.LabelHandler !== "undefined" && LabelHandler_1.LabelHandler) === "function" ? _a : Object])
], LabelService);
