import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from '../../entities/activity-log.entity';
import { User } from '../../entities/user.entity';
import { Project } from '../../entities/project.entity';
import { Task } from '../../entities/task.entity';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityLog, User, Project, Task])],
  providers: [ActivityService],
  controllers: [ActivityController],
  exports: [ActivityService],
})
export class ActivityModule {}
