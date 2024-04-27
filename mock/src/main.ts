import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const queues = ['employees_queue'];

  for (const queue of queues) {
    await app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: queue,
        noAck: false,
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('Mock API')
    .setDescription('Mock data for testing purposes')
    .setVersion('1.0')
    .addTag('mock')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3002);
}
bootstrap();
