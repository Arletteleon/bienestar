import { Component } from '@angular/core';
import { AlertService} from "../Funciones/alert.service";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { InterfaceRegister } from '../interface/interface.register';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css'],
})
export class RegisterPage {
  user: InterfaceRegister = {
    name: '',
    cupo: '',
    curp: '',
    rfc: '',
    state: '',
    job: '',
    hiring: '',
    dateAdmission: new Date()
  };

  constructor(
    private alertService: AlertService,
    private firestore: AngularFirestore
  ) {}

  async addRegister() {
    if (
      this.user.name &&
      this.user.cupo &&
      this.user.curp &&
      this.user.rfc &&
      this.user.state &&
      this.user.job &&
      this.user.hiring &&
      this.user.dateAdmission
    ) {
      await this.firestore.collection('users').add(this.user);
      this.user = {
        name: '',
        cupo: '',
        curp: '',
        rfc: '',
        state: '',
        job: '',
        hiring: '',
        dateAdmission: new Date()
      };
      await this.alertService.showAlert('Éxito', 'Registro agregado correctamente'); // Usa el método del servicio
    } else {
      await this.alertService.showAlert('Alerta', 'Debe rellenar todos los campos'); // Usa el método del servicio
    }
  }
}
