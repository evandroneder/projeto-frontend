import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.scss'],
})
export class RegisterBusinessComponent implements OnInit {
  services = [
    { id: 0, label: 'Pintura residencial' },
    { id: 1, label: 'Serviço de elétrica' },
    { id: 2, label: 'Pequenos reparos' },
    { id: 3, label: 'Montagem e desmontagem de móveis' },
  ];
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      celular: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      servicos: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  handleSubmit() {
    if (this.form.invalid) {
      return;
    }
  }
}
