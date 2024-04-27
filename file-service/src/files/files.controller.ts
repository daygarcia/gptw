import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { EventPattern } from '@nestjs/microservices';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload CSV file Endpoint' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async uploadFile(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 10000 }),
      new FileTypeValidator({ fileType: 'text/csv' }),
    ],
  })) file: Express.Multer.File) {
    try {
      let response: any = await this.filesService.uploadFile(file)
      if (!response.error) {
        response = await this.filesService.process(response.data);
      }
      return {
        error: false,
        statusCode: response?.status || HttpStatus.OK,
        message: response?.message || "file uploaded successfully",
        data: response?.data || [],
        errorsArray: response?.errorsArray || []
      };
    } catch (e) {
      throw new InternalServerErrorException(e?.message || "Internal Server Error")
    }
  }
}
