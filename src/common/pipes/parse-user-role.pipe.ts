import {
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UserRole } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class ParseUserRolePipe implements PipeTransform {
  transform(value: string): UserRole {
    if (!Object.values(UserRole).includes(value as UserRole)) {
      throw new BadRequestException(
        `Le rôle doit être l'une des valeurs suivantes: ${Object.values(UserRole).join(', ')}`,
      );
    }

    return value as UserRole;
  }
}