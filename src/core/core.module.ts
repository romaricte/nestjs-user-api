import { Module } from '@nestjs/common';


export const APP_CONFIG = 'APP_CONFIG';

const appConfig = {
  appName: 'Nest Users API',
  environment: 'development',
  supportEmail: 'support@example.com',
};

@Module({
     providers: [
    {
      provide: APP_CONFIG,
      useValue: appConfig,
    },
  ],
  exports: [APP_CONFIG],
})
export class CoreModule {}
