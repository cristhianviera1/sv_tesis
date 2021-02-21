"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = void 0;
const common_1 = require("@nestjs/common");
exports.Permissions = (...permissions) => common_1.SetMetadata('permissions', permissions);
//# sourceMappingURL=permissions.decorator.js.map