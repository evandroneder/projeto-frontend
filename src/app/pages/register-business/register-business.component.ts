import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicosService } from 'src/app/services/servicos.service';

@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.scss'],
})
export class RegisterBusinessComponent implements OnInit {
  services;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private servicosService: ServicosService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      celular: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      servicos: ['', Validators.required],
    });

    this.services = this.servicosService.services;
  }

  ngOnInit(): void {}

  handleSubmit() {
    if (this.form.invalid) {
      return;
    }
  }
}
