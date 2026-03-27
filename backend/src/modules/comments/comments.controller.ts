import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('tasks/:taskId')
  @ApiOperation({ summary: 'Create comment on task' })
  async create(@Param('taskId') taskId: string, @Body() body: any, @Request() req) {
    return this.commentsService.create(taskId, body.content, req.user.id);
  }

  @Get('tasks/:taskId')
  @ApiOperation({ summary: 'Get task comments' })
  async findByTask(@Param('taskId') taskId: string) {
    return this.commentsService.findByTask(taskId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get comment' })
  async findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update comment' })
  async update(@Param('id') id: string, @Body() body: any) {
    return this.commentsService.update(id, body.content);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete comment' })
  async delete(@Param('id') id: string) {
    return this.commentsService.delete(id);
  }
}
