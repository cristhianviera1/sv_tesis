/// <reference types="mongoose" />
import { NewnessService } from './newness.service';
import CreateNewnessDto from './dto/create-newness.dto';
import UpdateNewnessDto from './dto/update-newness.dto';
export declare class NewnessController {
    private readonly newnessService;
    constructor(newnessService: NewnessService);
    create(createNewnessDto: CreateNewnessDto): Promise<import("./schema/newness.schema").Newness>;
    update(updateNewnessDto: UpdateNewnessDto): Promise<import("./schema/newness.schema").Newness>;
    list(req: any): import("mongoose").DocumentQuery<import("./schema/newness.schema").Newness[], import("./schema/newness.schema").Newness, {}>;
    find(id: string): import("mongoose").DocumentQuery<import("./schema/newness.schema").Newness, import("./schema/newness.schema").Newness, {}>;
    delete(id: string): Promise<import("./schema/newness.schema").Newness>;
}
