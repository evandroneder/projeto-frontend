import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestService } from 'src/app/services/rest.service';

interface DialogData {
  _id: string;
  guid: number;
  nota: number;
}

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.scss'],
})
export class AvaliacaoComponent implements OnInit {
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AvaliacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private router: Router,
    private rest: RestService,
    private snack: MatSnackBar
  ) {
    this.form = fb.group({
      desc: [''],
      nota: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  getTotal() {
    return new Array(this.data.nota);
  }

  onClose() {
    this.dialogRef.close({ finalizado: false });
  }

  onConfirm() {
    this.rest
      .post('user/endContract', {
        _id: this.data._id,
        guid: this.data.guid,
        nota: this.form.value.nota,
      })
      .pipe(
        catchError((e) => {
          this.snack.open(e, 'x');
          return throwError(e);
        })
      )
      .subscribe(() => {
        this.router.navigate(['perfil']);
        this.dialogRef.close({ finalizado: true });
      });
  }
}
