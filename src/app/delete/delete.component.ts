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
  showUserData: boolean = false;

  constructor(
    private alertService: AlertService,
    private firestore: AngularFirestore) {}

  ionViewWillEnter() {
    this.cupo='';
    this.showUserData = false; // Establece la variable en false al cargar la página
    this.cupoBorrar='';
  }
  onSearchbarInput(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Elimina caracteres no numéricos utilizando una expresión regular
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Actualiza el valor del ion-searchbar
    inputElement.value = numericValue;

    // Actualiza el modelo (ngModel) con el valor numérico
    this.cupo = numericValue;
  }
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
          this.showUserData = true; // Mostrar elementos de información
        } else {
          this.alertService.showAlert('Advertencia', 'No se encontraron registros.');
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
          this.cupo = '';
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
              this.alertService.showAlert('Éxito', 'Registro eliminado'); // Usa el método del servicio
              console.log('Usuario eliminado correctamente.');
              this.showUserData = false; // Mostrar elementos de información
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
