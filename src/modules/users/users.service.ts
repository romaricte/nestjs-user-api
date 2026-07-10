import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotificationsService } from 'src/modules/notifications/notifications.service';
import { HashService } from 'src/shared/services/hash.service';
import { AuditService } from 'src/modules/audit/audit.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';

type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
};
const userPublicSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  phone: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;
@Injectable()
export class UsersService {
constructor(
  private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
      private readonly hashService: HashService,
      private readonly auditService: AuditService

){}

 

 async findAll(query: FindUsersQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      AND: [
        query.search
          ? {
              OR: [
                {
                  name: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
                {
                  email: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {},
        query.role
          ? {
              role: query.role,
            }
          : {},
      ],
    };
      const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        select: userPublicSelect,
      }),
      this.prisma.user.count({
        where,
      }),
    ]);

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
 async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userPublicSelect,
    });

    if (!user) {
      throw new NotFoundException(`User avec l'id ${id} introuvable`);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: userPublicSelect,
    });

    if (!user) {
      throw new NotFoundException(`User avec l'email ${email} introuvable`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
          role: createUserDto.role,
          phone: createUserDto.phone,
        },
        select: userPublicSelect,
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          name: updateUserDto.name,
          email: updateUserDto.email,
          password: updateUserDto.password,
          role: updateUserDto.role,
          phone: updateUserDto.phone,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.prisma.user.delete({
      where: { id },
    });
  }

  private handlePrismaError(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException('Une donnée unique existe déjà');
    }

    throw error;
  }
}
