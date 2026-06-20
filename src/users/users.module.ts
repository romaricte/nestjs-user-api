import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
    imports: [UsersModule],
    providers: [UsersService],

})
export class UsersModule {}
