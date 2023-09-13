import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { InterfaceRegister } from '../interface/interface.register';
import { AlertService} from "../Funciones/alert.service";

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
  showUserData: boolean = false;

  // Mantén una copia separada para los datos del usuario actual
  userCopy: InterfaceRegister | undefined;

  constructor(private firestore: AngularFirestore,
              private alertService:AlertService) {}

  ionViewWillEnter() {
    this.cupo=''
    this.showUserData = false; // Establece la variable en false al cargar la página
  }

  onStateInputChange(event: any) {
    const inputValue = event.target.value;
    this.user.state = inputValue.toUpperCase();
  }
  onJobInputChange(event: any) {
    const inputValue = event.target.value;
    this.user.job = inputValue.toUpperCase();
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
          this.showUserData = true; // Mostrar elementos de información
        } else {
          this.cupo = '';
          this.showUserData = false; // Ocultar elementos de información si no se encontró un usuario
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
          this.cupo = '';
        } else {
          this.alertService.showAlert('Error', 'Usuario no encontrado.')
          this.cupo = '';
          this.showUserData = false; // Ocultar elementos de información si no se encontró un usuario
        }
      });
  }


  updateUser() {
    // Actualiza los datos del usuario en la base de datos
    const userRef = this.firestore.collection('users').doc(this.userId); // Reemplaza 'vk5mZmuuGZhMK5sM8ZEI' con el ID correcto del usuario
    userRef
      .update(this.user)
      .then(() => {
        this.alertService.showAlert('Exito','Datos actulizados')
        this.showUserData = false; // Establece la variable en false al cargar la página
        // No es necesario sobrescribir this.user después de la actualización
      })
      .catch((error) => {
        this.alertService.showAlert('Error','Error al actulizar los datos')
      });
  }
}
