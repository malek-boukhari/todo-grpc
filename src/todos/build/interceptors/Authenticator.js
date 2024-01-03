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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const grpc = __importStar(require("@grpc/grpc-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticate(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (call, callback) {
        const header = call.metadata.get('authorization')[0];
        if (!header) {
            callback({
                code: grpc.status.UNAUTHENTICATED,
                details: 'No token provided'
            });
            return;
        }
        const bearer = header.toString().split(' ');
        const token = bearer[1];
        try {
            jsonwebtoken_1.default.verify(token, process.env.BEARER_SECRET);
        }
        catch (e) {
            callback({
                code: grpc.status.UNAUTHENTICATED,
                details: 'The token is not valid'
            });
        }
        originalMethod.call(this, call, callback);
    };
}
exports.authenticate = authenticate;
