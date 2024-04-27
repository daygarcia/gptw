import { Module } from '@nestjs/common';
import { authClientConfig } from './auth-clients.config';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([authClientConfig]),
  ],
  exports: [AuthClientsModule],
})
export class AuthClientsModule { }
