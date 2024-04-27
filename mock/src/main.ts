import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const queues = ['employees_queue'];

  for (const queue of queues) {
    await app.connectMicroservice<MicroserviceOptions>({
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

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4020,
    },
  });

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
