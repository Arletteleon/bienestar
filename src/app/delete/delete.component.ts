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

  constructor(
    private alertService: AlertService,
    private firestore: AngularFirestore) {}

   searchUser() {
    console.log(this.cupo);
    this.cupoBorrar = this.cupo;
    this.firestore
      .collection<InterfaceRegisterWithFormattedDate>('users', (ref) =>
        ref.where('cupo', '==', parseInt(this.cupo))
      )
      .valueChanges()
      .subscribe((users: InterfaceRegisterWithFormattedDate[]) => {
        if (users.length === 0) {
          // No se encontraron usuarios con el cupo especificado
          this.alertService.showAlert('Mensaje', 'No se encontraron usuarios con el cupo especificado.');
        } else {
          users = users.map((user) => {
            // Convierte el Timestamp a una fecha legible con nombre de mes
            const dateAdmission = (user.dateAdmission instanceof firebase.firestore.Timestamp) ? user.dateAdmission.toDate() : user.dateAdmission;
            const monthNames = [
              'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
              'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
            ];
            const day = dateAdmission.getDate();
            const monthIndex = dateAdmission.getMonth();
            const year = dateAdmission.getFullYear();
            user.dateAdmissionFormatted = `${day} de ${monthNames[monthIndex]} de ${year}`;
            return user;
          });

          this.users = of(users);
        }
      });
    this.cupo = '';
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

    this.cupo = '';
  }
}
