import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from '../../entities/sprint.entity';
import { Project } from '../../entities/project.entity';
import { SprintsService } from './sprints.service';
import { SprintsController } from './sprints.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint, Project])],
  providers: [SprintsService],
  controllers: [SprintsController],
  exports: [SprintsService],
})
export class SprintsModule {}
