"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./modules/app.module");
async function createApp(expressApp) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    return app;
}
exports.createApp = createApp;
//# sourceMappingURL=app.js.map