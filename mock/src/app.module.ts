import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { RabbitMQController } from './queue/rabbit-mq/rabbit-mq.controller';
import { RabbitMqModule } from './queue/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [EmployeesModule, RabbitMqModule],
  controllers: [AppController, RabbitMQController],
  providers: [AppService],
})
export class AppModule { }
