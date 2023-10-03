import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { MenuComponent } from './menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdministradoresModule } from './administradores/administradores.module';
import { ClientesModule } from './clientes/clientes.module';
import { ComunicacaoClientesModule } from './comunicacao-clientes/comunicacao-clientes.module';
import { EspacosEsportivosModule } from './espacos-esportivos/espacos-esportivos.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EdicaoPerfilModule } from './edicao-perfil/edicao-perfil.module';

@NgModule({
  declarations: [AppComponent, CabecalhoComponent, MenuComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    LoginModule,
    DashboardModule,
    AdministradoresModule,
    ClientesModule,
    ComunicacaoClientesModule,
    EspacosEsportivosModule,
    RelatoriosModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    EdicaoPerfilModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
