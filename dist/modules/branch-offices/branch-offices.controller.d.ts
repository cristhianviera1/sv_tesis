import { BranchOfficesService } from './branch-offices.service';
import CreateBranchOfficeDto from './dto/create-branch-office.dto';
import UpdateBranchOfficeDto from './dto/update-branch-office.dto';
export declare class BranchOfficesController {
    private readonly branchOfficeService;
    constructor(branchOfficeService: BranchOfficesService);
    create(createBranchOfficeDto: CreateBranchOfficeDto): Promise<import("./schema/branch-office.schema").BranchOffice>;
    list(): Promise<import("./schema/branch-office.schema").BranchOffice[]>;
    find(id: string): Promise<import("./schema/branch-office.schema").BranchOffice>;
    delete(id: string): Promise<import("./schema/branch-office.schema").BranchOffice>;
    update(updateBranchOfficeDto: UpdateBranchOfficeDto): Promise<import("./schema/branch-office.schema").BranchOffice>;
    changeStatus({ toggle_status }: {
        toggle_status: boolean;
    }, id: string): Promise<import("./schema/branch-office.schema").BranchOffice>;
    findWithEmployee(req: any): Promise<import("./schema/branch-office.schema").BranchOffice>;
}
