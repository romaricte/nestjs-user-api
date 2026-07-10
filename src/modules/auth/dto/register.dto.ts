import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum RegisterRoleDto {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;

  @IsOptional()
  @IsEnum(RegisterRoleDto)
  role?: RegisterRoleDto;

  @IsOptional()
  @IsString()
  @Matches(/^6[0-9]{8}$/, {
    message:
      'Le numéro de téléphone doit être un numéro camerounais valide, exemple: 699123456',
  })
  phone?: string;
}