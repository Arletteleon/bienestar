import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

interface User {
  // Propiedades del tipo User
  cupo: number;
}
@Injectable({
  providedIn: 'root'
})
export class CupoCheck{
  private usersCollection!: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection<User>('users');
  }

  async checkCupoExistence(cupo: number): Promise<boolean> {
    try {
      const querySnapshot = await this.usersCollection.ref.where('cupo', '==', cupo).get();
      return querySnapshot.size > 0;
    } catch (error) {
      console.log('Error al consultar la base de datos', error);
      return false;
    }
  }
}
