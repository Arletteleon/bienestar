import { Component,  } from '@angular/core';
import { AngularFireStorage} from "@angular/fire/compat/storage";
import { finalize } from 'rxjs/operators';
import { AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css'],
})
export class PermisosComponent {
  selectedFile: File | undefined;
  downloadURL: string | null = null;
  uploadProgress: number | null = null;

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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

              // Guardar la referencia de la imagen en Firestore
              const imageInfo = {
                url: this.downloadURL,
                name: this.selectedFile?.name || 'Nombre de archivo desconocido',
                // Otros datos relacionados con la imagen que desees guardar
              };

              this.firestore.collection('imagenes').add(imageInfo)
                .then((docRef) => {
                  console.log('Imagen guardada en Firestore:', docRef.id);
                  // Aquí puedes realizar acciones adicionales después de guardar la imagen
                })
                .catch((error) => {
                  console.error('Error al guardar la imagen en Firestore:', error);
                  // Aquí puedes manejar el error de manera apropiada
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
  }
}
