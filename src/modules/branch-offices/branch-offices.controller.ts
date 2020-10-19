import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { BranchOfficesService } from './branch-offices.service';
import { ACGuard, UseRoles } from 'nest-access-control';
import CreateBranchOfficeDto from './dto/create-branch-office.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import UpdateBranchOfficeDto from './dto/update-branch-office.dto';

@Controller('branch-offices')
export class BranchOfficesController {
  constructor(
    private readonly branchOfficeService: BranchOfficesService,
  ) {
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'branchOffices',
    action: 'create',
    possession: 'any',
  })
  @Post()
  create(@Body(ValidationPipe) createBranchOfficeDto: CreateBranchOfficeDto, @Req() req) {
    return this.branchOfficeService.create(createBranchOfficeDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'branchOffices',
    action: 'read',
    possession: 'any',
  })
  @Get()
  list() {
    return this.branchOfficeService.list();
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'branchOffices',
    action: 'read',
    possession: 'any',
  })
  @Get('/:id')
  find(@Param('id') id: string) {
    return this.branchOfficeService.find(id);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'branchOffices',
    action: 'delete',
    possession: 'any',
  })
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.branchOfficeService.delete(id);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'branchOffices',
    action: 'update',
    possession: 'any',
  })
  @Put()
  update(@Body(ValidationPipe) updateBranchOfficeDto: UpdateBranchOfficeDto) {
    return this.branchOfficeService.update(updateBranchOfficeDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'branchOffices',
    action: 'update',
    possession: 'any',
  })
  @Put('/status/:id')
  changeStatus(@Body(ValidationPipe) toggle_status: boolean, @Param('id') id: string) {
    return this.branchOfficeService.updateStatus(toggle_status, id);
  }
}
