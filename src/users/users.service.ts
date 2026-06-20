import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';

type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
};

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Romaric',
      email: 'romaric@example.com',
      role: UserRole.USER,
      phone: '699123456',
    },
    {
      id: 2,
      name: 'Sarah',
      email: 'sarah@example.com',
      role: UserRole.ADMIN,
      phone: '677123456',
    },
  ];

  findAll(query: FindUsersQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    let result = [...this.users];

    if (query.search) {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(query.search!.toLowerCase()),
      );
    }

    if (query.role) {
      result = result.filter((user) => user.role === query.role);
    }

    const total = result.length;
    const start = (page - 1) * limit;
    const data = result.slice(start, start + limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User avec l'id ${id} introuvable`);
    }

    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const emailAlreadyExists = this.users.some(
      (user) => user.email === createUserDto.email,
    );

    if (emailAlreadyExists) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    const newUser: User = {
      id: this.users.length + 1,
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      role: createUserDto.role ?? UserRole.USER,
      phone: createUserDto.phone,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);

    if (updateUserDto.email) {
      const emailAlreadyExists = this.users.some(
        (item) => item.email === updateUserDto.email && item.id !== id,
      );

      if (emailAlreadyExists) {
        throw new ConflictException('Cet email est déjà utilisé');
      }
    }

    Object.assign(user, updateUserDto);

    return user;
  }

  remove(id: number): void {
    const user = this.findOne(id);

    this.users = this.users.filter((item) => item.id !== user.id);
  }
}