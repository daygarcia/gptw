import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthClientsModule } from './auth-clients/auth-clients.module';

@Module({
  imports: [FilesModule, EmployeesModule, AuthClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
