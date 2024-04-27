import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RabbitMqService {
  constructor(private eventEmitter: EventEmitter2) { }

  async emitEvent(event: string, data: any) {
    this.eventEmitter.emit(event, data);
  }

}
