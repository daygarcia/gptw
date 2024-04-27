import { ClientProviderOptions, Transport } from "@nestjs/microservices";

export const authClientConfig: ClientProviderOptions = {
  name: 'AUTH_CLIENT',
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: 4000
  }
};
