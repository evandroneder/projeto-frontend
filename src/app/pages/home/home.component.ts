import { Component, OnInit } from '@angular/core';
import { ServicosService } from 'src/app/services/servicos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  services;
  constructor(private servicosServices: ServicosService) {
    this.services = this.servicosServices.services;
  }

  ngOnInit(): void {}
}
