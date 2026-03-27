import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Post()
  @ApiOperation({ summary: 'Upload document' })
  async create(@Body() createDocumentDto: any, @Request() req) {
    return this.documentsService.create(createDocumentDto, req.user.id);
  }

  @Get('projects/:projectId')
  @ApiOperation({ summary: 'Get project documents' })
  async findByProject(@Param('projectId') projectId: string) {
    return this.documentsService.findByProject(projectId);
  }

  @Get('tasks/:taskId')
  @ApiOperation({ summary: 'Get task attachments' })
  async findByTask(@Param('taskId') taskId: string) {
    return this.documentsService.findByTask(taskId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document' })
  async findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update document' })
  async update(@Param('id') id: string, @Body() updateDocumentDto: any) {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete document' })
  async delete(@Param('id') id: string) {
    return this.documentsService.delete(id);
  }
}
