"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToUnixTimestamp = exports.generateUnixTimestamp = void 0;
const moment_1 = __importDefault(require("moment"));
exports.generateUnixTimestamp = () => moment_1.default().unix();
exports.convertToUnixTimestamp = (date) => moment_1.default(date).unix();
//# sourceMappingURL=generateUnixTimestamp.js.map