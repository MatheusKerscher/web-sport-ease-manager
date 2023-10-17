import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EspacosEsportivosComponent } from './espacos-esportivos.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EspacosEsportivosRoutingModule } from './espacos-esportivos-routing.module';
import { FormComponent } from './form/form.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderConfig, NgxUiLoaderModule, POSITION, SPINNER } from 'ngx-ui-loader';
import { ChipEsporteComponent } from './chip-esporte/chip-esporte.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ModalDetalhesComponent } from './modal-detalhes/modal-detalhes.component';

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
    EspacosEsportivosComponent,
    FormComponent,
    ChipEsporteComponent,
    ModalDetalhesComponent
  ],
  imports: [
    CommonModule,
    EspacosEsportivosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [NgxImageCompressService]
})
export class EspacosEsportivosModule { }
