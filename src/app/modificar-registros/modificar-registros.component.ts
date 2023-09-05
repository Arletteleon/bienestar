import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { InterfaceRegister } from '../interface/interface.register';

@Component({
  selector: 'app-modificar-registros',
  templateUrl: './modificar-registros.component.html',
  styleUrls: ['./modificar-registros.component.css'],
})
export class ModificarRegistrosComponent {
  cupo: string = '';
  cupoActualizar: string = '';
  users: Observable<any[]> | undefined;
  user: InterfaceRegister = {
    name: '',
    cupo: '',
    rfc: '',
    curp: '',
    state: '',
    job: '',
    hiring: '',
    dateAdmission: new Date(),
  };
  userDataToRestore: InterfaceRegister | null = null; // Variable para guardar datos antes de eliminar

  constructor(private firestore: AngularFirestore) {}

  searchUser() {
    console.log(this.cupo);
    this.firestore
      .collection<InterfaceRegister>('users', (ref) =>
        ref.where('cupo', '==', parseInt(this.cupo))
      )
      .valueChanges()
      .subscribe((users: InterfaceRegister[]) => {
        this.users = of(users);
      });
    this.cupoActualizar = this.cupo;
    this.cupo = '';
  }

  async updateUser() {
    if (!this.cupoActualizar) {
      console.error('El valor de cupoActualizar no es válido.');
      return;
    }

    const cupoToDelete = parseInt(this.cupoActualizar);
    console.log(this.cupoActualizar);
    console.log(cupoToDelete);

    // Obtén los datos del usuario antes de eliminarlo
    try {
      const querySnapshot = await this.firestore
        .collection<InterfaceRegister>('users', (ref) =>
          ref.where('cupo', '==', cupoToDelete)
        )
        .get()
        .toPromise();

      // @ts-ignore
      querySnapshot.forEach((doc) => {
        this.userDataToRestore = doc.data() as InterfaceRegister;
      });

      // Elimina el usuario existente
      // @ts-ignore

      querySnapshot.forEach((doc) => {
        doc.ref
          .delete()
          .then(() => {
            console.log('Usuario eliminado correctamente.');
          })
          .catch((error) => {
            console.error('Error al eliminar el usuario:', error);
          });
      });

      // Agrega un nuevo usuario con los datos actualizados o restaurados
      if (this.userDataToRestore) {
        await this.firestore.collection('users').add(this.userDataToRestore);
        console.log('Usuario agregado correctamente con datos restaurados.');
      }

      this.userDataToRestore = null; // Limpia los datos restaurados
    } catch (error) {
      console.error('Error al obtener/eliminar/agregar el usuario:', error);
    }

    this.cupo = '';
  }
}
