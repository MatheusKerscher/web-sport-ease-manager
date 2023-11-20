import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderConfig, NgxUiLoaderModule, POSITION, SPINNER } from 'ngx-ui-loader';
import { EdicaoPerfilComponent } from './edicao-perfil.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';
import { AtivacaoEmailComponent } from './ativacao-email/ativacao-email.component';
import { RouterModule } from '@angular/router';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#5d5fef",
  bgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsType: SPINNER.ballSpinClockwise,
  fgsType: SPINNER.ballSpin,
  fgsColor: '#5d5fef',
  blur: 10,
  overlayColor: "rgba(255,255,255,0.5)",
  hasProgressBar: false
};

@NgModule({
  declarations: [
    EdicaoPerfilComponent,
    ModalConfirmacaoComponent,
    AtivacaoEmailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ]
})
export class EdicaoPerfilModule { }
