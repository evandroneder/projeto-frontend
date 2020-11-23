import { Component, OnInit } from '@angular/core';
import { ServicosService } from 'src/app/services/servicos.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  prestadores: { id: number; nome: string; nota: number }[];
  constructor(private servicosServices: ServicosService) {
    this.prestadores = [
      { id: 0, nome: 'Empresa A', nota: 1 },
      { id: 1, nome: 'Empresa B', nota: 5 },
    ];
  }

  ngOnInit(): void {}

  getTotal(nota: number) {
    return new Array(nota);
  }
}
