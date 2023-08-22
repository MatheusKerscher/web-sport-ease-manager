import { Component } from '@angular/core';
import { faFaceSmile, faUserCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
})
export class CabecalhoComponent {
  faUser = faUserCircle;

  nomeAdministrador: string = 'Rafael';
}
