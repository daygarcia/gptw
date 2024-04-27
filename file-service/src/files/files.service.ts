import { Inject, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import * as csv from 'csv-parse';
import { COLUMNS } from './consts/files.const';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FilesService {

  constructor(@Inject('EMPLOYEES_SERVICE') private client: ClientProxy) { }


  async uploadFile(file: Express.Multer.File) {

    const csvContent = file.buffer
    const parsedData: any = await new Promise((resolve, reject) => {
      csv.parse(csvContent, {
        columns: true,
        trim: true,
        delimiter: ';',
        skip_empty_lines: true,
        cast: function (value, context) {
          if (context.header) {
            return value;
          }

          if (context.index === COLUMNS.age) {
            return parseInt(value)
          }

          if (context.index === COLUMNS.hiringDate) {
            const [day, month, year] = value.split('/')
            return new Date(`${year}-${month}-${day}`);
          }

          if (context.index === COLUMNS.salary) {
            value = value.replace(',', '.')
            return parseFloat(value)
          }
          return value;
        },
        cast_date: true, // Converte datas automaticamente
      }, (err, records) => {
        if (err) {
          reject(err);
          return { error: true, message: "Unable to parse file" }
        }
        resolve(records);
      });
    });


    // console.log('parsedData', parsedData)
    const errors: string[] = [];
    if (!parsedData.length) {
      errors.push('Empty File Provided')
      return { error: true, message: "File Validation Failed", errorsArray: errors }
    }
    //validate All Rows
    for await (const [index, rowData] of parsedData.entries()) {
      // console.log('rowData', rowData)
      const validationErrors = await this.validateFileRow(rowData)
      if (validationErrors.length) {
        return { error: true, message: `File Rows Validation Failed at row: ${index + 1}`, errorsArray: validationErrors }
      }
    }

    return { error: false, data: parsedData };
  }

  async process(createFileDtos: CreateFileDto[]) {
    try {
      this.client.emit('upload_employee', {
        id: `File-${Math.random() * 100}}`,
        data: {
          employees: createFileDtos,
        },
      });

      return {
        message: 'File sent to mock (employees) service',
      };
    } catch (error) {
      return {
        error: true,
        status: 500,
        message: 'Error sending file to mock (employees) service',
        errorsArray: [error.message],
      };
    }
  }

  async validateFileRow(rowData) {
    const errors: string[] = [];

    const csvDto = plainToInstance(CreateFileDto, rowData);

    const validationErrors = await validate(csvDto);
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        const { property, constraints } = error;
        const errorMessage = `${property}: ${Object.values(constraints).join(', ')}`;
        errors.push(errorMessage);
      });
    }
    return errors
  }

}
