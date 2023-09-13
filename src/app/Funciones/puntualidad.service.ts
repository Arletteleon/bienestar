import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PuntualidadService {
  constructor() {}

  calcularEstadoPuntualidad(hora: Date): string {
    const horaLimite1 = new Date();
    horaLimite1.setHours(9, 0, 0, 0);

    const horaLimite2 = new Date();
    horaLimite2.setHours(9, 15, 0, 0);

    if (hora < horaLimite1) {
      return 'Puntual';
    } else if (hora <= horaLimite2) {
      return 'Retardo';
    } else {
      return 'Falta';
    }
  }
}
