import { Component } from '@angular/core';
import { AlertService} from "../Funciones/alert.service";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { InterfaceRegister } from '../interface/interface.register';
import {CupoCheck} from "../Funciones/cupo.check";

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
    private firestore: AngularFirestore,
    private cupoCheck: CupoCheck // Agrega el servicio CupoCheck aquí
  ) {}


  // Este método se llamará cuando la página se active
  ionViewWillEnter() {
    this.user = {
      name: '',
      cupo: '', // Mantén el campo "cupo" como una cadena en el modelo local
      curp: '',
      rfc: '',
      state: '',
      job: '',
      hiring: '',
      dateAdmission: new Date(),
    };
  }
  onCurpInputChange(event: any) {
    const inputValue = event.target.value;
    this.user.curp = inputValue.toUpperCase();
  }

  onRfcInputChange(event: any) {
    const inputValue = event.target.value;
    this.user.rfc = inputValue.toUpperCase();
  }

  onNameInputChange(event: any) {
    const inputValue = event.target.value;
    this.user.name = inputValue.toUpperCase();
  }

  onStateInputChange(event: any) {
    const inputValue = event.target.value;
    this.user.state = inputValue.toUpperCase();
  }

  onJobInputChange(event: any) {
    const inputValue = event.target.value;
    this.user.job = inputValue.toUpperCase();
  }
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
      // Verifica si el cupo ya existe
      const cupoExists = await this.cupoCheck.checkCupoExistence(
        parseInt(this.user.cupo)
      );

      if (cupoExists) {
        await this.alertService.showAlert(
          'Error',
          'El cupo ya está registrado'
        );
      }else {
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
        await this.alertService.showAlert(
          'Éxito',
          'Registro agregado correctamente'
        );
      }
    } else {
      await this.alertService.showAlert(
        'Alerta',
        'Debe rellenar todos los campos'
      );
    }
  }
}
