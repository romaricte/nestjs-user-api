import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { APP_CONFIG } from '../core/core.module';
import { ConsoleNotificationProvider } from './providers/console-notification.provider';
import { EmailNotificationProvider } from './providers/email-notification.provider';
import { NOTIFICATION_PROVIDER } from './providers/notification-provider.interface';
import { NotificationsService } from './notifications.service';

type AppConfig = {
  appName: string;
  environment: string;
  supportEmail: string;
};

@Module({
  imports: [CoreModule],
  providers: [
    ConsoleNotificationProvider,
    EmailNotificationProvider,
    {
      provide: NOTIFICATION_PROVIDER,
      useFactory: (
        config: AppConfig,
        consoleProvider: ConsoleNotificationProvider,
        emailProvider: EmailNotificationProvider,
      ) => {
        if (config.environment === 'production') {
          return emailProvider;
        }

        return consoleProvider;
      },
      inject: [
        APP_CONFIG,
        ConsoleNotificationProvider,
        EmailNotificationProvider,
      ],
    },
    NotificationsService,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}