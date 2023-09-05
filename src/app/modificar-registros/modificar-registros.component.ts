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
  users: Observable<InterfaceRegister[]> | undefined;
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
  userId:string='';

  // Mantén una copia separada para los datos del usuario actual
  userCopy: InterfaceRegister | undefined;

  constructor(private firestore: AngularFirestore) {}

  searchUser() {
    console.log(this.cupo);
    this.cupoActualizar = this.cupo;
    this.firestore
      .collection<InterfaceRegister>('users', (ref) =>
        ref.where('cupo', '==', parseInt(this.cupo))
      )
      .get()
      .subscribe((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Si se encontraron documentos con el cupo especificado, toma el primer documento
          const doc = querySnapshot.docs[0];
          this.userId = doc.id; // Obtiene el ID del documento
        }
      });

    this.firestore
      .collection<InterfaceRegister>('users', (ref) =>
        ref.where('cupo', '==', parseInt(this.cupo))
      )
      .valueChanges()
      .subscribe((users: InterfaceRegister[]) => {
        if (users.length > 0) {
          this.user = users[0]; // Actualiza la variable user con los datos del usuario encontrado
          this.userCopy = { ...this.user }; // Haz una copia separada para evitar sobrescribir los datos después
          this.users = of(users);
        } else {
          // Si no se encuentra el usuario, puedes manejarlo aquí
          console.log('Usuario no encontrado.');
        }
      });
  }

  updateUser() {
    // Actualiza los datos del usuario en la base de datos
    const userRef = this.firestore.collection('users').doc(this.userId); // Reemplaza 'vk5mZmuuGZhMK5sM8ZEI' con el ID correcto del usuario
    userRef
      .update(this.user)
      .then(() => {
        console.log('Datos actualizados exitosamente.');
        // No es necesario sobrescribir this.user después de la actualización
      })
      .catch((error) => {
        console.error('Error al actualizar datos:', error);
      });
  }
}
