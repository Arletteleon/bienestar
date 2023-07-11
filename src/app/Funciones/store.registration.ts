import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { InterfaceRegistrationTime } from '../interface/interface.registration.time';

@Injectable({
  providedIn: 'root'
})
export class StoreRegistration {

  constructor(private firestore: AngularFirestore) { }

  async storeRegistration(cupo: number): Promise<void> {
    const currentTime = new Date();
    const registration: InterfaceRegistrationTime = {
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
