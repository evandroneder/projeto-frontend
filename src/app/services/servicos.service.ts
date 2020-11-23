import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicosService {
  services = [
    { id: 0, label: 'Pintura residencial', image: './assets/pintura.jpg' },
    { id: 1, label: 'Serviço de elétrica', image: './assets/eletrica.jpg' },
    {
      id: 2,
      label: 'Pequenos reparos',
      image: './assets/pequenos_reparos.jpeg',
    },
    {
      id: 3,
      label: 'Montagem e desmontagem de móveis',
      image: './assets/montagem_desmontagem.jpg',
    },
  ];
  constructor() {}
}
