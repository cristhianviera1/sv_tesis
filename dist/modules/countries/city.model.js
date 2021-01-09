"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const uuid_1 = require("uuid");
class City {
    constructor(name) {
        this._id = uuid_1.v4();
        this.name = name;
    }
}
exports.City = City;
//# sourceMappingURL=city.model.js.map