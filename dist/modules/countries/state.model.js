"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const uuid_1 = require("uuid");
class State {
    constructor(name, cities) {
        this._id = uuid_1.v4();
        this.name = name;
        this.cities = cities;
    }
}
exports.State = State;
//# sourceMappingURL=state.model.js.map