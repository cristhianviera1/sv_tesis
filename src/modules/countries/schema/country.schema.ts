import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { State } from '../state.model';
import { v4 as uuid4 } from 'uuid';

@Schema()
export class Country extends Document {
    @Prop({
        default: () => uuid4(),
    })
    _id: string;

    @Prop()
    code: string;

    @Prop()
    name: string;

    @Prop({ type: 'number' })
    phone_code: number;

    @Prop({ type: mongoose.Schema.Types.Array })
    states: State[];

    constructor(code: string, name: string, phone_code: number, states: State[]) {
        super();
        this.code = code;
        this.name = name;
        this.phone_code = phone_code;
        this.states = states;
    }
}

export const CountrySchema = SchemaFactory.createForClass(Country);
