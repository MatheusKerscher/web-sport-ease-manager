import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmailAtivacaoRequest } from 'src/app/shared/models/email-ativacao-request/email-ativacao-request.model';
import { AdmService } from 'src/app/shared/services/adm/adm.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-ativacao-email',
  templateUrl: './ativacao-email.component.html',
  styleUrls: ['./ativacao-email.component.scss'],
})
export class AtivacaoEmailComponent implements OnInit, OnDestroy {
  ativandoEmail: boolean = true;
  emailAtivada: boolean = false;
  email = env.email;
  inscricaoRota!: Subscription;
  inscricaoAtivacao!: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private admService: AdmService
  ) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');

    this.inscricaoRota = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        const token = queryParams['token'];

        if (token) {
          const ativacaoEmail: EmailAtivacaoRequest = new EmailAtivacaoRequest(token)
          this.inscricaoAtivacao = this.admService
            .ativarEmail(ativacaoEmail)
            .subscribe({
              next: (result) => {
                this.ativandoEmail = false;
                this.emailAtivada = true;
              },

              error: (err) => {
                this.ativandoEmail = false;
                this.emailAtivada = false;
              },
            });
        }
      }
    );
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
    this.inscricaoAtivacao?.unsubscribe();
    this.inscricaoRota?.unsubscribe();
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
