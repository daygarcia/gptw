import { Controller, Logger } from '@nestjs/common'
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RabbitMqService } from './rabbit-mq.service';

@Controller()
export class RabbitMQController {
  private readonly logger = new Logger(RabbitMQController.name);

  constructor(private readonly rabbitMqService: RabbitMqService) { }

  @MessagePattern('upload_employee')
  async receiveUpload(@Payload() data, @Ctx() context: RmqContext) {
    try {
      this.logger.log(`data: ${JSON.stringify(data)}`);

      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();

      channel.ack(originalMsg);

      const { employees } = data.data;

      await this.rabbitMqService.emitEvent('upload_employee', employees);
      return data;
    } catch (error) {
      this.logger.log(`Error > showEmployee error: ${error}`);
    }
  }
}        