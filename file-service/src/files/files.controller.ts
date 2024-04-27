import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
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

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
