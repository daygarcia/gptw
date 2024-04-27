import { Module } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';
import { RabbitMQController } from './rabbit-mq.controller';

@Module({
  controllers: [RabbitMQController],
  providers: [RabbitMqService]
})
export class RabbitMqModule { }
