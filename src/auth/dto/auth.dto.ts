import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Rol } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsEnum(Rol, { message: 'El rol debe ser CLIENTE, VETERINARIO o ADMINISTRADOR' })
  rol: Rol;
}

export class LoginDto {
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  password: string;
}