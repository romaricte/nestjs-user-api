import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [UsersModule, NotificationsModule, SharedModule, CoreModule, FeatureModule, AuditModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
