import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  loading: boolean;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private rest: RestService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      type: ['USER'],
    });
    this.loading = false;
  }

  ngOnInit(): void {}

  handleSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.rest
      .post('user', this.form.value)
      .pipe(
        catchError((e) => {
          {
            this.snack.open(e, 'x');
            return throwError(e);
          }
        })
      )
      .subscribe(() => this.router.navigate(['login']))
      .add(() => (this.loading = false));
  }
}
