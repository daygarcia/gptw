import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { authClientConfig } from '../auth-clients/auth-clients.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMPLOYEES_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'employees_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      authClientConfig
    ]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule { }
