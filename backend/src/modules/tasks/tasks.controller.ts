import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create task' })
  async create(@Body() createTaskDto: any) {
    // Project ID should be in body
    const { projectId, ...rest } = createTaskDto;
    return this.tasksService.create(projectId, rest);
  }

  @Get('projects/:projectId')
  @ApiOperation({ summary: 'Get tasks by project' })
  async findByProject(@Param('projectId') projectId: string) {
    return this.tasksService.findByProject(projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task' })
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update task' })
  async update(@Param('id') id: string, @Body() updateTaskDto: any) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  async delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
