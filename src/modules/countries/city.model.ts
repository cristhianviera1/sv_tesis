import { v4 as uuid4 } from 'uuid';

export class City {
    _id: string;
    name: string;

    constructor(name: string) {
        this._id = uuid4();
        this.name = name;
    }
}
