import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ParsePositiveIntPipe } from 'src/common/pipes/parse-positive-int.pipe';
import { ParseUserRolePipe } from 'src/common/pipes/parse-user-role.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: FindUsersQueryDto) {
    return this.usersService.findAll(query);
  }

// @Get('by-role/:role')
// findByRole(@Param('role', ParseUserRolePipe) role: UserRole) {
//   return this.usersService.findByRole(role);
// }

  @Get(':id')
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    this.usersService.remove(id);
  }
}