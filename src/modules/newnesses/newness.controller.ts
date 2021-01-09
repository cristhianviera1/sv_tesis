import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { NewnessService } from './newness.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import CreateNewnessDto from './dto/create-newness.dto';
import UpdateNewnessDto from './dto/update-newness.dto';

@Controller('newness')
export class NewnessController {
  constructor(private readonly newnessService: NewnessService) {
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'newness',
    action: 'create',
    possession: 'any',
  })
  @Post()
  create(@Body(ValidationPipe) createNewnessDto: CreateNewnessDto) {
    return this.newnessService.create(createNewnessDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'newness',
    action: 'update',
    possession: 'any',
  })
  @Put()
  update(@Body(ValidationPipe) updateNewnessDto: UpdateNewnessDto) {
    return this.newnessService.update(updateNewnessDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'newness',
    action: 'read',
    possession: 'any',
  })
  @Get()
  list(@Request() req) {
    const startDate = req?.query?.start_date;
    const endDate = req?.query?.end_date;
    if (startDate && endDate) {
      return this.newnessService.list({
        deleted_at: null,
        created_at: {
          $gte: Number(startDate),
          $lte: Number(endDate),
        },
      });
    }
    return this.newnessService.list({ deleted_at: null });
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'newness',
    action: 'read',
    possession: 'any',
  })
  @Get('/:id')
  find(@Param('id')id: string) {
    return this.newnessService.find(id);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'newness',
    action: 'delete',
    possession: 'any',
  })
  @Delete('/:id')
  delete(@Param('id')id: string) {
    return this.newnessService.delete(id);
  }
}
