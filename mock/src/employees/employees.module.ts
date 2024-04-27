import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PrismaService } from '../prisma.service';
import { ClientsModule } from '@nestjs/microservices';
import { authClientConfig } from '../auth-clients/auth-clients.config';

@Module({
  imports: [ClientsModule.register([
    authClientConfig
  ])],
  controllers: [EmployeesController],
  providers: [EmployeesService, PrismaService],
})
export class EmployeesModule { }
