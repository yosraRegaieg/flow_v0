import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SprintsService } from './sprints.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Sprints')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sprints')
export class SprintsController {
  constructor(private sprintsService: SprintsService) {}

  @Post('projects/:projectId')
  @ApiOperation({ summary: 'Create sprint' })
  async create(@Param('projectId') projectId: string, @Body() createSprintDto: any) {
    return this.sprintsService.create(projectId, createSprintDto);
  }

  @Get('projects/:projectId')
  @ApiOperation({ summary: 'Get sprints by project' })
  async findByProject(@Param('projectId') projectId: string) {
    return this.sprintsService.findByProject(projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sprint' })
  async findOne(@Param('id') id: string) {
    return this.sprintsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update sprint' })
  async update(@Param('id') id: string, @Body() updateSprintDto: any) {
    return this.sprintsService.update(id, updateSprintDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete sprint' })
  async delete(@Param('id') id: string) {
    return this.sprintsService.delete(id);
  }
}
