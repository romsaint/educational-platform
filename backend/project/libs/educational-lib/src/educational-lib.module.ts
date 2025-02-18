import { Module } from '@nestjs/common';
import { EducationalLibService } from './educational-lib.service';

@Module({
  providers: [EducationalLibService],
  exports: [EducationalLibService],
})
export class EducationalLibModule {}
