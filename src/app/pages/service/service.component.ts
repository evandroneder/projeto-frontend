import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ContratarComponent } from 'src/app/modals/contratar/contratar.component';
import { RestService } from 'src/app/services/rest.service';
import { ServicosService } from 'src/app/services/servicos.service';

interface IResult {
  email: string;
  name: string;
  phone: string;
  services: [{ id: 0; label: string; image: string }];
  type: string;
  _id: string;
  nota: number;
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  prestadores: IResult[];
  name: string = '';
  id: number;
  constructor(
    private servicosServices: ServicosService,
    private matDialog: MatDialog,
    private rest: RestService,
    private snack: MatSnackBar,
    private ac: ActivatedRoute
  ) {
    this.prestadores = [];
    this.id = -1;
  }

  ngOnInit(): void {
    this.ac.params.pipe(take(1)).subscribe((r) => {
      this.name = r.nome;
      this.id = r.id;
      this.get();
    });
  }

  getTotal(nota: number) {
    return new Array(nota);
  }

  handleContract(prestador: IResult) {
    this.matDialog.open(ContratarComponent, {
      width: '450px',
      data: prestador,
    });
  }

  loading = false;
  get() {
    this.loading = true;
    this.rest
      .get<IResult[]>('user/service', { id: this.id })
      .pipe(
        catchError((e) => {
          {
            this.snack.open(e, 'x');
            return throwError(e);
          }
        })
      )
      .subscribe((result) => (this.prestadores = result))
      .add(() => (this.loading = false));
  }
}
