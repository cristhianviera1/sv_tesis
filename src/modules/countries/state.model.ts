import { v4 as uuid4 } from 'uuid';
import { City } from './city.model';

export class State {
  _id: string;
  name: string;
  cities: City[];

  constructor(name: string, cities: City[]) {
    this._id = uuid4();
    this.name = name;
    this.cities = cities;
  }
}
