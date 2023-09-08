import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { InterfaceRegister } from '../interface/interface.register';
import firebase from "firebase/compat/app"; // Importa el módulo app de Firebase
import { AlertService } from "../Funciones/alert.service";


interface InterfaceRegisterWithFormattedDate extends InterfaceRegister {
  dateAdmissionFormatted: string;
}
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent {

  cupo: string = '';
  cupoBorrar: string = '';
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
  userId:string='';

  constructor(
    private alertService: AlertService,
    private firestore: AngularFirestore) {}

  searchUser() {
    console.log(this.cupo);
    this.cupoBorrar = this.cupo;
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
          this.users = of(users);
        } else {
          // Si no se encuentra el usuario, puedes manejarlo aquí
          console.log('Usuario no encontrado.');
        }
      });
  }


   deleteUser() {
    const cupoToDelete = parseInt(this.cupoBorrar);
    console.log(this.cupoBorrar);
    console.log(cupoToDelete);
    this.firestore
      .collection<InterfaceRegister>('users', (ref) =>
        ref.where('cupo', '==', cupoToDelete)
      )
      .get()
      .toPromise()
      .then((querySnapshot) => {
        // @ts-ignore
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              this.alertService.showAlert('Éxito', 'El usuario se eliminó'); // Usa el método del servicio
              console.log('Usuario eliminado correctamente.');
            })
            .catch((error) => {
              this.alertService.showAlert('Error', 'Error al eliminar el usuario'); // Usa el método del servicio
              console.error('Error al eliminar el usuario:', error);
            });
        });
      })
      .catch((error) => {
        this.alertService.showAlert('Error', 'Error al obtener los usuarios'); // Usa el método del servicio
        console.error('Error al obtener los usuarios:', error);
      });

    this.user.name;
     this.user.cupo;
     this.user.rfc;
     this.user.curp;
     this.user.state;
     this.user.job;
     this.user.hiring;
     this.user.dateAdmission;

     this.cupo = '';
  }
}
