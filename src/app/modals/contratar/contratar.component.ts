import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestService } from 'src/app/services/rest.service';

interface DialogData {
  _id: number;
  name: string;
  nota: number;
  phone: string;
}

@Component({
  selector: 'app-contratar',
  templateUrl: './contratar.component.html',
  styleUrls: ['./contratar.component.scss'],
})
export class ContratarComponent implements OnInit {
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ContratarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private router: Router,
    private rest: RestService,
    private snack: MatSnackBar
  ) {
    this.form = fb.group({ desc: ['', Validators.required] });
  }

  ngOnInit(): void {}

  getTotal() {
    return new Array(this.data.nota);
  }

  onClose() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.rest
      .post('user/contract', {
        _id: this.data._id,
        name: this.data.name,
        description: this.form.value.desc,
        phone: this.data.phone,
      })
      .pipe(
        catchError((e) => {
          this.snack.open(e, 'x');
          return throwError(e);
        })
      )
      .subscribe(() => {
        this.router.navigate(['perfil']);
        this.onClose();
      });
  }
}
