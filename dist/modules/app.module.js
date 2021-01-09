"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const app_roles_1 = require("../consts/app.roles");
const users_module_1 = require("./users/users.module");
const nest_access_control_1 = require("nest-access-control");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const branch_offices_module_1 = require("./branch-offices/branch-offices.module");
const auth_module_1 = require("./auth/auth.module");
const countries_module_1 = require("./countries/countries.module");
const employees_module_1 = require("./employees/employees.module");
const newness_module_1 = require("./newnesses/newness.module");
const products_module_1 = require("./products/products.module");
const rooms_module_1 = require("./rooms/rooms.module");
const chats_module_1 = require("./chats/chats.module");
const shopping_carts_module_1 = require("./shopping-carts/shopping-carts.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forRoot(`mongodb://${process.env.APP_DBUSERNAME}:${process.env.APP_DBPASSWORD}@${process.env.APP_DBHOST}/${process.env.APP_DBNAME}?authSource=admin`),
            branch_offices_module_1.BranchOfficesModule,
            auth_module_1.AuthModule,
            countries_module_1.CountriesModule,
            nest_access_control_1.AccessControlModule.forRoles(app_roles_1.roles),
            employees_module_1.EmployeesModule,
            newness_module_1.NewnessModule,
            products_module_1.ProductsModule,
            rooms_module_1.RoomsModule,
            shopping_carts_module_1.ShoppingCartsModule,
            chats_module_1.ChatsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map