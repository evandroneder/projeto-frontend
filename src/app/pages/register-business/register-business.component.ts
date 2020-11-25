import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestService } from 'src/app/services/rest.service';
import { ServicosService } from 'src/app/services/servicos.service';

@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.scss'],
})
export class RegisterBusinessComponent implements OnInit {
  loading: boolean = false;
  services;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private servicosService: ServicosService,
    private rest: RestService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      services: ['', Validators.required],
      type: ['BUSINESS'],
    });

    this.services = this.servicosService.services;
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
