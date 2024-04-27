import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{
      name: 'USERS_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4010,
      }
    }]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  providers: [
    AuthService, /* {
      provide: APP_GUARD,
      useClass: AuthGuard,
    } */],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }