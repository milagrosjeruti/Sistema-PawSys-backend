import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { VeterinariosModule } from './veterinarios/veterinarios.module';
import { AdministradoresModule } from './administradores/administradores.module';
import { HistorialesClinicosModule } from './historiales-clinicos/historiales-clinicos.module';
import { ConsultasModule } from './consultas/consultas.module';
import { VacunacionesModule } from './vacunaciones/vacunaciones.module';

@Module({
  imports: [PrismaModule, AuthModule, ClientesModule, MascotasModule, VeterinariosModule, AdministradoresModule, HistorialesClinicosModule, ConsultasModule, VacunacionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
