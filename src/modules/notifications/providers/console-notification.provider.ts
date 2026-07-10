import { Injectable } from '@nestjs/common';
import { NotificationProvider } from './notification-provider.interface';

@Injectable()
export class ConsoleNotificationProvider implements NotificationProvider {
  send(to: string, message: string): void {
    console.log(`Console notification to ${to}: ${message}`);
  }
}