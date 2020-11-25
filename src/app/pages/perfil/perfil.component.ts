import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AvaliacaoComponent } from 'src/app/modals/avaliacao/avaliacao.component';
import { RestService } from 'src/app/services/rest.service';

interface IProfile {
  _id: string;
  name: string;
  email: string;
  type: string;
  phone: string;
  nota: number;
  servicos: any[];
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  perfil: IProfile | undefined;
  constructor(
    private matDialog: MatDialog,
    private snack: MatSnackBar,
    private router: Router,
    private rest: RestService
  ) {}

  ngOnInit(): void {
    this.get();
  }

  getTotal() {
    return new Array(this.perfil?.nota);
  }

  onCloseService(service: { id: number; desc: string }) {
    this.matDialog.open(AvaliacaoComponent, {
      width: '450px',
      data: service,
    });
  }

  loading = false;
  get() {
    this.loading = true;
    this.rest
      .get<IProfile>('user/profile')
      .pipe(
        catchError((e) => {
          {
            this.snack.open(e, 'x');
            return throwError(e);
          }
        })
      )
      .subscribe((r) => (this.perfil = r))
      .add(() => (this.loading = false));
  }
}
