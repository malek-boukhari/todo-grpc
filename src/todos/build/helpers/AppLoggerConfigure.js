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
exports.AppLoggerConfigure = void 0;
const inversify_1 = require("inversify");
const log4js_1 = require("log4js");
let AppLoggerConfigure = class AppLoggerConfigure {
    constructor() {
        this.logLevel = process.env.NODE_ENV === 'dev' ? 'DEBUG' : 'INFO';
        (0, log4js_1.configure)({
            appenders: {
                console: { type: 'stdout', layout: { type: 'colored' } },
                dateFile: {
                    type: 'dateFile',
                    filename: process.env.LOG_FILE,
                    layout: { type: 'basic' },
                    compress: true,
                    numBackups: 14,
                    keepFileExt: true
                }
            },
            categories: {
                default: {
                    appenders: ['console', 'dateFile'],
                    level: this.logLevel
                }
            }
        });
        this.logger = (0, log4js_1.getLogger)();
    }
};
exports.AppLoggerConfigure = AppLoggerConfigure;
exports.AppLoggerConfigure = AppLoggerConfigure = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], AppLoggerConfigure);
