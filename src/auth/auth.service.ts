import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existe = await this.prisma.usuario.findUnique({
      where: { correo: dto.correo },
    });

    if (existe) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        correo: dto.correo,
        passwordHash: hashedPassword,
        rol: dto.rol,
      },
    });

    const { passwordHash, ...result } = usuario;
    return result;
  }

  async login(dto: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo: dto.correo },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValido = await bcrypt.compare(dto.password, usuario.passwordHash);

    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Actualizamos el último acceso del usuario
    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: { ultimoAcceso: new Date() },
    });

    const payload = { sub: usuario.id, correo: usuario.correo, rol: usuario.rol };
    const token = this.jwtService.sign(payload);

    const { passwordHash, ...userWithoutPassword } = usuario;

    return {
      user: userWithoutPassword,
      access_token: token,
    };
  }
}