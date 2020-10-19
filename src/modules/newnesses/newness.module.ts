import { Module } from '@nestjs/common';
import { NewnessService } from './newness.service';
import { NewnessController } from './newness.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Newness, NewnessSchema } from './schema/newness.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Newness.name , schema: NewnessSchema},
    ]),
  ],
  providers: [NewnessService],
  controllers: [NewnessController]
})
export class NewnessModule {}
