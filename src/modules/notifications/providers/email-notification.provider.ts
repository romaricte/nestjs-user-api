import { Injectable } from '@nestjs/common';
import { NotificationProvider } from './notification-provider.interface';

@Injectable()
export class EmailNotificationProvider implements NotificationProvider {
  send(to: string, message: string): void {
    console.log(`Email notification to ${to}: ${message}`);
  }
}