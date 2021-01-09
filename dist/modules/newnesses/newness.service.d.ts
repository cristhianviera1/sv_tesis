import { Newness } from './schema/newness.schema';
import { FilterQuery, Model } from 'mongoose';
import CreateNewnessDto from './dto/create-newness.dto';
import UpdateNewnessDto from './dto/update-newness.dto';
export declare class NewnessService {
    private newnessModel;
    constructor(newnessModel: Model<Newness>);
    create(createNewnessDto: CreateNewnessDto): Promise<Newness>;
    find(id: string): import("mongoose").DocumentQuery<Newness, Newness, {}>;
    list(conditions: FilterQuery<Newness>): import("mongoose").DocumentQuery<Newness[], Newness, {}>;
    update(updateNewnessDto: UpdateNewnessDto): Promise<Newness>;
    delete(id: string): Promise<Newness>;
}
