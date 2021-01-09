"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPassword = void 0;
const generate_password_1 = __importDefault(require("generate-password"));
exports.generateRandomPassword = () => generate_password_1.default.generate({ length: 8, numbers: true });
//# sourceMappingURL=generatePassword.js.map