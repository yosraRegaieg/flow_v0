import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ActivityService } from './activity.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Activity')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get('projects/:projectId')
  @ApiOperation({ summary: 'Get project activity log' })
  async getProjectActivity(
    @Param('projectId') projectId: string,
    @Query('skip') skip = 0,
    @Query('take') take = 50,
  ) {
    return this.activityService.getProjectActivity(projectId, skip, take);
  }

  @Get('tasks/:taskId')
  @ApiOperation({ summary: 'Get task activity log' })
  async getTaskActivity(
    @Param('taskId') taskId: string,
    @Query('skip') skip = 0,
    @Query('take') take = 50,
  ) {
    return this.activityService.getTaskActivity(taskId, skip, take);
  }
}
