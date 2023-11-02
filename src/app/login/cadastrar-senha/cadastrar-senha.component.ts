import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';
import { CadastroSenhaRequest } from 'src/app/shared/models/adm/cadastro-senha-request.model';
import { ValidacoesForm } from 'src/app/utils/validacoes-form';

@Component({
  selector: 'app-cadastrar-senha',
  templateUrl: './cadastrar-senha.component.html',
  styleUrls: ['./cadastrar-senha.component.scss'],
})
export class CadastrarSenhaComponent implements OnInit, OnDestroy {
  faInvalid = faXmark;
  faValid = faCheck;
  senhasDiferentes: boolean = true;
  passwordChecklist: boolean = false;
  focusPasswordType?: string;

  private token?: string;

  inscricaoRota!: Subscription;
  inscricaoAlterarSenha!: Subscription;

  public formNovaSenha: FormGroup = new FormGroup({
    senha: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmacaoSenha: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private ngxService: NgxUiLoaderService,
    private toastrService: ToastrService,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');
    this.inscricaoRota = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        const tokenQueryParams = queryParams['token'];
        if (tokenQueryParams) this.token = tokenQueryParams;
      }
    );

    this.formNovaSenha
      .get('senha')
      ?.valueChanges.subscribe(() => this.verificarSenhas());

    this.formNovaSenha
      .get('confirmacaoSenha')
      ?.valueChanges.subscribe(() => this.verificarSenhas());
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
    this.inscricaoAlterarSenha?.unsubscribe();
    this.inscricaoRota?.unsubscribe();
  }

  verificarSenhas() {
    const result = ValidacoesForm.senhasValid(
      this.formNovaSenha.get('senha')!,
      this.formNovaSenha.get('confirmacaoSenha')!,
      this.passwordChecklist
    );
    this.passwordChecklist = result;
    this.senhasDiferentes = result;
  }

  focusPassword() {
    this.passwordChecklist = true;
  }

  blurPassword() {
    if (
      this.formNovaSenha.get('senha')?.valid &&
      this.formNovaSenha.get('confirmacaoSenha')?.valid &&
      !this.senhasDiferentes
    ) {
      this.passwordChecklist = false;
    }
  }

  passwordValid(campo: string): boolean {
    if (
      this.formNovaSenha.controls[campo].hasError('required') ||
      this.formNovaSenha.controls[campo].hasError('minlength')
    ) {
      return true;
    }
    return false;
  }

  recuperarSenha() {
    this.ngxService.startLoader('loader-01');
    const form = this.formNovaSenha;

    if (form.valid && !this.senhasDiferentes) {
      const dados: CadastroSenhaRequest = new CadastroSenhaRequest(
        this.token,
        form.get('senha')?.value
      );

      this.inscricaoAlterarSenha = this.loginService
        .alterarSenha(dados)
        .subscribe({
          next: (result) => {
            this.ngxService.stopLoader('loader-01');
            this.toastrService.success(
              'Sua senha foi alterada com sucesso.',
              'Senha alterada!'
            );
            this.router.navigateByUrl('/login');
          },
          error: (err) => {
            this.toastrService.error(
              'Não foi possível atualizar sua senha. Por favor, tente novamente mais tarde',
              'Falha ao atualziar senha!'
            );
            this.ngxService.stopLoader('loader-01');
          },
        });
    } else {
      this.toastrService.warning(
        'Por favor, preencha todos os campos corretamente',
        'Atenção!'
      );
      this.ngxService.stopLoader('loader-01');
    }
  }
}
