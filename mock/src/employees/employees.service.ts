import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../prisma.service';
import { Employee, Prisma } from '@prisma/client';
import { OnEvent } from '@nestjs/event-emitter';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) { }

  create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: createEmployeeDto
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.EmployeeWhereInput;
    orderBy?: Prisma.EmployeeOrderByWithRelationInput;
  }): Promise<Employee[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.employee.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  findOne(id: number) {
    return this.prisma.employee.findUnique({
      where: { id }
    });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.employee.update(
      {
        where: { id },
        data: updateEmployeeDto
      }
    );
  }

  remove(id: number) {
    return this.prisma.employee.delete(
      {
        where: { id }
      }
    );
  }

  @OnEvent('upload_employee')
  async handleUploadEmployeeEvent(data: any) {
    for (const employee of data) {
      const dto = plainToInstance(CreateEmployeeDto, employee);
      await this.create(dto);
    }
  }

}
