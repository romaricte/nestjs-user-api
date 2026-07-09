import { UserRole } from '../../generated/prisma/client';

export type JwtPayload = {
  sub: number;
  email: string;
  role: UserRole;
};