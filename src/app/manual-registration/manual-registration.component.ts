import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { InterfaceRegistrationTime } from '../interface/interface.registration.time';
import { CupoCheck } from "../Funciones/cupo.check";
import { StoreRegistration } from "../Funciones/store.registration";
import { AlertService } from "../Funciones/alert.service";
import firebase from 'firebase/compat/app';


interface User {
  cupo: number;
}

@Component({
  selector: 'app-manual-registration',
  templateUrl: './manual-registration.component.html',
  styleUrls: ['./manual-registration.component.css'],
})
export class ManualRegistrationComponent implements OnInit {
  private usersCollection!: AngularFirestoreCollection<User>;
  currentDate: string | undefined;
  date: string | undefined;
  inputValue: string = '';
  user: InterfaceRegistrationTime = {
    cupo: 0,
    time: new Date(),
    puntualidad: "",
  };

  constructor(
    private firestore: AngularFirestore,
    private alertService: AlertService,
    private cupoCheck: CupoCheck,
    private registration: StoreRegistration
  ) {}

  ionViewWillEnter() {
    this.inputValue='';
  }
  onInputValueChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Elimina caracteres no numéricos utilizando una expresión regular
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Actualiza el valor del ion-input
    inputElement.value = numericValue;

    // Actualiza el modelo (ngModel) con el valor numérico
    this.inputValue = numericValue;
  }


  ngOnInit() {
    moment.locale('es');
    setInterval(() => {
      const now = moment();
      this.currentDate = now.format('HH:mm:ss');
      this.date = now.format('dddd, D [de] MMMM [de] YYYY');
    }, 1000);

    this.usersCollection = this.firestore.collection<User>('users');
  }

  async registerManual() {
    this.user.cupo = parseInt(this.inputValue, 10);

    if (this.usersCollection) {
      await this.checkCupoExistence(this.user.cupo);
    }
  }

  async checkCupoExistence(cupo: number) {
    try {
      const exists = await this.cupoCheck.checkCupoExistence(cupo);

      if (exists) {
        await this.storeRegistration(this.user);
      } else {
        this.alertService.showAlert('Error', 'El CUPO no está registrado');
      }
    } catch (error) {
      this.alertService.showAlert('Error', 'Error al consultar la base de datos');
    }
  }

  async storeRegistration(data: InterfaceRegistrationTime) {
    try {
      const horaRegistro = new Date(); // Supongamos que obtienes la hora actual
      const estadoPuntualidad = this.calcularEstadoPuntualidad(horaRegistro);

      // Ahora, crea la entrada con el estado de puntualidad
      const nuevaEntrada: InterfaceRegistrationTime = {
        cupo: data.cupo,
        time: horaRegistro,
        puntualidad: estadoPuntualidad, // Establece el estado de puntualidad
      };

      // Luego, guárdala en la base de datos
      await this.registration.storeRegistration(nuevaEntrada.cupo, nuevaEntrada.puntualidad);
      this.alertService.showAlert('Éxito', 'Entrada Registrada');
    } catch (error) {
      this.alertService.showAlert('Error', 'Error al almacenar el registro');
    }
  }

  private calcularEstadoPuntualidad(hora: Date): string {
    const horaLimite1 = new Date();
    horaLimite1.setHours(9, 16, 0, 0);

    const horaLimite2 = new Date();
    horaLimite2.setHours(9, 30, 0, 0);

    if (hora < horaLimite1) {
      return 'Puntual';
    } else if (hora <= horaLimite2) {
      return 'Retardo';
    } else {
      return 'Falta';
    }
  }
}
