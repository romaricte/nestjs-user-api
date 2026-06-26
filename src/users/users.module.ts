import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { UsersController } from './users.controller';
import { SharedModule } from 'src/shared/shared.module';
import { AuditModule } from 'src/audit/audit.module';

@Module({
    imports: [NotificationsModule,SharedModule,AuditModule],
    controllers :[UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
