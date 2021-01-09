import { FilterQuery, Model } from 'mongoose';
import { BranchOffice } from './schema/branch-office.schema';
import CreateBranchOfficeDto from './dto/create-branch-office.dto';
import UpdateBranchOfficeDto from './dto/update-branch-office.dto';
export declare class BranchOfficesService {
    private branchOffice;
    constructor(branchOffice: Model<BranchOffice>);
    create(createBranchOffice: CreateBranchOfficeDto): Promise<BranchOffice>;
    find(id: string): Promise<BranchOffice>;
    findWithEmployee(id: string): Promise<BranchOffice>;
    list(): Promise<BranchOffice[]>;
    delete(id: string): Promise<BranchOffice>;
    findIfExist(conditions: FilterQuery<BranchOffice>, propName: string): Promise<void>;
    update(updateBranchOffice: UpdateBranchOfficeDto): Promise<BranchOffice>;
    updateStatus(status: boolean, id: string): Promise<BranchOffice>;
    getSafeParameteres(branchOffice: BranchOffice): BranchOffice;
}
