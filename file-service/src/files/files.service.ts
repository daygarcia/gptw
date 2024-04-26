import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { read } from './utils/file-reader';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class FilesService {
  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  async uploadFile(file: Express.Multer.File) {
    const fileContent = read(file, 'text/csv');

    const parsedFile = fileContent.split('\n').map((row) => row.split(';'));

    const validatedRows = [];

    for (const row of parsedFile) {
      const validatedRow = plainToInstance(CreateFileDto, row);
      console.log('validatedRow', validatedRow);
      const errors = await validate(validatedRow);

      if (errors.length === 0) {
        validatedRows.push(validatedRow);
      } else {
        // Handle validation errors as needed
        console.error('Validation errors:', errors);
      }
    }

    // console.log('validatedRows', validatedRows);
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
