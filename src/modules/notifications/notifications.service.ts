import { Inject, Injectable } from '@nestjs/common';
import { NOTIFICATION_PROVIDER } from './providers/notification-provider.interface';
import type { NotificationProvider } from './providers/notification-provider.interface';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_PROVIDER)
    private readonly notificationProvider: NotificationProvider,
  ) {}

  sendWelcomeEmail(email: string, name: string): void {
    this.notificationProvider.send(email, `Bienvenue ${name}`);
  }
}