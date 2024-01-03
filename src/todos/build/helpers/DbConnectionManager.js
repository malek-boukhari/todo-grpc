"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionManager = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DbConnectionManager {
    static async createConnection() {
        const urlConnection = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
        await mongoose_1.default.connect(urlConnection);
        return mongoose_1.default.connection;
    }
}
exports.DbConnectionManager = DbConnectionManager;
