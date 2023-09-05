import { Component } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { CupoCheck} from "../Funciones/cupo.check"; // Importa el servicio CupoCheck
import { AlertService} from "../Funciones/alert.service";


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

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private cupoCheckService: CupoCheck, // Agrega el servicio CupoCheck al constructor
    private alertService:AlertService
  ) {}

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

  uploadImage() {
    if (this.selectedFile) {
      const fileRef = this.storage.ref(this.selectedFile.name);
      const task = this.storage.upload(this.selectedFile.name, this.selectedFile);

      // Actualizar el progreso de carga
      task.percentageChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url: string) => {
              this.downloadURL = url;
              console.log('URL de descarga:', url);

              // Obtener el valor del campo "cupo" que deseas verificar
              const cupoAVerificar = this.cupo;

              // Utilizar el servicio para verificar la existencia del "cupo"
              this.cupoCheckService.checkCupoExistence(parseInt(cupoAVerificar)).then((exists: boolean) => {
                if (exists) {
                  // El "cupo" ya existe, puedes almacenar la imagen
                  const imageInfo = {
                    url: this.downloadURL,
                    name: this.selectedFile?.name || 'Nombre de archivo desconocido',
                    cupo: this.cupo,
                    observaciones: this.observaciones,
                    // Otros datos relacionados con la imagen que desees guardar
                  };

                  this.firestore.collection('imagenes').add(imageInfo)
                    .then((docRef) => {
                      this.alertService.showAlert('Éxito', 'Imagen y datos guardados'); // Usa el método del servicio
                      console.log('Imagen y datos guardados en Firestore:', docRef.id);
                      // Aquí puedes realizar acciones adicionales después de guardar la imagen y datos
                    })
                    .catch((error) => {
                      this.alertService.showAlert('Mensaje', 'Error al guardar la imagen y datos'); // Usa el método del servicio
                      console.error('Error al guardar la imagen y datos en Firestore:', error);
                      // Aquí puedes manejar el error de manera apropiada
                    });
                } else {
                  // El "cupo" no existe en la colección de usuarios
                  this.alertService.showAlert('Mensaje', 'El CUPO no existe'); // Usa el método del servicio
                  console.error('El "cupo" no existe en la colección de usuarios.');
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
    }
    else{
      console.error('Agrega un documento antes');
    }
  }
}
