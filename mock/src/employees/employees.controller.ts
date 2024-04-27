import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Param('skip') skip: number,
    @Param('take') take: number,
    @Param('where') where: string,
    @Param('orderBy') orderBy: string
  ) {
    return this.employeesService.findAll(
      {
        skip: skip ? Number(skip) : undefined,
        take: take ? Number(take) : undefined,
        where: where ? JSON.parse(where) : undefined,
        orderBy: orderBy ? JSON.parse(orderBy) : undefined,
      }
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
