import { Module } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';
import { RabbitMQController } from './rabbit-mq.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [RabbitMQController],
  providers: [RabbitMqService]
})
export class RabbitMqModule { }
