import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AvaliacaoComponent } from 'src/app/modals/avaliacao/avaliacao.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  perfil: {
    nome?: string;
    nota?: number;
  };
  servicos: { id: number; desc: string; finalizado: boolean }[];
  constructor(private matDialog: MatDialog) {
    this.servicos = [
      { id: 0, desc: 'blablabla', finalizado: false },
      { id: 1, desc: 'blablabla', finalizado: false },
      { id: 2, desc: 'blablabla', finalizado: true },

      { id: 3, desc: 'blablabla', finalizado: true },
    ];
    this.perfil = { nota: 5, nome: 'Empresa B' };
  }

  ngOnInit(): void {}

  getTotal() {
    return new Array(this.perfil.nota);
  }

  onCloseService(service: { id: number; desc: string }) {
    this.matDialog.open(AvaliacaoComponent, {
      width: '450px',
      data: service,
    });
  }
}
