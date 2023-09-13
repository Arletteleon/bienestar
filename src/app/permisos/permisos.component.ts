import { Component } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { CupoCheck} from "../Funciones/cupo.check"; // Importa el servicio CupoCheck
import { AlertService} from "../Funciones/alert.service";
import firebase from "firebase/compat/app";
import {ModalController} from "@ionic/angular";


@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css'],
})
export class PermisosComponent {
  selectedFile: File | undefined;
  downloadURL: string | null = null;
  uploadProgress: number | null = null;
  cupo: string = '';
  observaciones: string = '';
  selectedFilePreview: string | null = null; // Agrega esta propiedad para la vista previa de la imagen

  fechaPermiso: string | null = null;
  diasPermiso: string = '';

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private cupoCheckService: CupoCheck, // Agrega el servicio CupoCheck al constructor
    private alertService: AlertService,
    public modalCtrl: ModalController,
  ) {
  }


  // Este método se llamará cuando la página se active
  ionViewWillEnter() {
    // Restablecer los valores de los campos aquí
    this.cupo = '';
    this.observaciones = '';
    this.diasPermiso = '';
    this.fechaPermiso = null;
    this.selectedFilePreview = null;
  }
  onInputValueChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Elimina caracteres no numéricos utilizando una expresión regular
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Actualiza el valor del ion-input
    inputElement.value = numericValue;

    // Actualiza el modelo (ngModel) con el valor numérico
    this.cupo = numericValue;
  }

  onInputValueChangeDias(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Elimina caracteres no numéricos utilizando una expresión regular
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Actualiza el valor del ion-input
    inputElement.value = numericValue;

    // Actualiza el modelo (ngModel) con el valor numérico
    this.diasPermiso = numericValue;
  }

  onFileSelected(event: any) {

    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFilePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFilePreview = null;
    }
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }


  uploadImage() {
    if (!this.fechaPermiso) {
      // Si fechaPermiso es nula o falsa, muestra un mensaje de error y sale de la función
      this.alertService.showAlert('Error', 'Seleccione una fecha de permiso');
      return;
    }
    if (this.selectedFile) {
      const fileRef = this.storage.ref(this.selectedFile.name);
      const task = this.storage.upload(this.selectedFile.name, this.selectedFile);

      // Convierte el valor de cupo en un número antes de almacenarlo
      const cupoNumerico = parseInt(this.cupo, 10);

      // Obtén la fecha seleccionada desde el modelo fechaPermiso
      const fechaPermiso = this.fechaPermiso;
      const diasPermiso = this.diasPermiso;

      // Verifica si la fecha es una cadena no nula y no está vacía
      if (fechaPermiso && fechaPermiso.trim() !== '') {
        // Convierte la cadena de fecha en un objeto de fecha JavaScript
        const fechaSeleccionada = new Date(fechaPermiso);

        // Verifica si la fecha es válida antes de continuar
        if (!isNaN(fechaSeleccionada.getTime())) {
          // Convierte la fecha en un timestamp de Firestore
          const timestamp = firebase.firestore.Timestamp.fromDate(fechaSeleccionada);
      // Actualizar el progreso de carga
      task.percentageChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url: string) => {
              this.downloadURL = url;

              // Obtener el valor del campo "cupo" que deseas verificar
              const cupoAVerificar = cupoNumerico;

              // Utilizar el servicio para verificar la existencia del "cupo"
              this.cupoCheckService.checkCupoExistence(cupoAVerificar).then((exists: boolean) => {
                if (exists) {
                  // El "cupo" ya existe, puedes almacenar la imagen
                  const imageInfo = {
                    url: this.downloadURL,
                    name: this.selectedFile?.name || 'Nombre de archivo desconocido',
                    cupo: cupoNumerico, // Almacena el valor numérico
                    observaciones: this.observaciones,
                    fechaPermiso: timestamp, // Utiliza la fecha seleccionada
                    diasPermiso: diasPermiso,   // Agrega los días de permiso aquí
                    // Otros datos relacionados con la imagen que desees guardar
                  };

                  this.firestore.collection('imagenes').add(imageInfo)
                    .then((docRef) => {
                      this.cupo = '';
                      this.observaciones = '';
                      this.diasPermiso = '';
                      this.fechaPermiso = null;
                      this.selectedFilePreview = null;
                      this.alertService.showAlert('Éxito', 'Datos de permiso guardado');
                      // Aquí puedes realizar acciones adicionales después de guardar la imagen y datos
                    })
                    .catch((error) => {
                      this.alertService.showAlert('Error', 'Error al guardar los datos');
                      // Aquí puedes manejar el error de manera apropiada
                    });
                } else {
                  // El "cupo" no existe en la colección de usuarios
                  this.alertService.showAlert('Error', 'El CUPO no existe');
                  this.cupo = '';

                  // Puedes mostrar un mensaje de error en la interfaz de usuario o tomar otras acciones aquí
                }
              });
            });
          })
        )
        .subscribe((percentage: number | undefined) => {
          if (percentage !== undefined) {
            this.uploadProgress = Math.round(percentage);
          }
        });
        } else {
          // La fecha no es válida, muestra un mensaje de error
          this.alertService.showAlert('Error', 'Fecha de permiso inválida');
        }
      } else {
        // La fecha es nula o está vacía, muestra un mensaje de error
        this.alertService.showAlert('Error', 'Seleccione una fecha de permiso válida');
      }
    } else {
      this.alertService.showAlert('Error', 'Agregue algún documento antes');
    }
  }
}
