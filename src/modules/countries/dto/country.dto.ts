import { State } from '../state.model';
import { IsNotEmpty } from 'class-validator';

export class CountryDto {
    _id: string;

    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    phone_code: number;

    @IsNotEmpty()
    states: State[];

    constructor(
      code: string,
      name: string,
      phone_code: number,
      states: State[],
    ) {
        this.code = code;
        this.name = name;
        this.phone_code = phone_code;
        this.states = states;
    }
}
