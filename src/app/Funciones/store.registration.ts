import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { InterfaceRegistrationTime } from '../interface/interface.registration.time';
import {InterfaceRegistrationTimeExit} from "../interface/interface.registration.time.exit";

@Injectable({
  providedIn: 'root'
})
export class StoreRegistration {

  constructor(private firestore: AngularFirestore) { }

  async storeRegistration(cupo: number, puntualidad:String): Promise<void> {
    const currentTime = new Date();
    const registration: InterfaceRegistrationTime = {
      cupo: cupo,
      time: currentTime,
      puntualidad: puntualidad,
    };

    try {
      await this.firestore.collection('registrationTime').add(registration);
    } catch (error) {
      throw new Error('Error al almacenar el registro');
    }
  }
  async storeRegistrationExit(cupo: number): Promise<void> {
    const currentTime = new Date();
    const registration: InterfaceRegistrationTimeExit = {
      cupo: cupo,
      time: currentTime,
    };

    try {
      await this.firestore.collection('registrationTime').add(registration);
    } catch (error) {
      throw new Error('Error al almacenar el registro');
    }
  }
}
