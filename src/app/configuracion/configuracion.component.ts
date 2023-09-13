import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from "@angular/fire/compat/firestore"; // Importa AngularFirestore
import { AlertService } from '../Funciones/alert.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
})
export class ConfiguracionComponent implements OnInit {
  contrasena: string = '';
  contrasenaNueva: string = '';
  contrasenaNuevaDos: string = '';

  constructor(
    private firestore: AngularFirestore,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  async updatePassword() {
    try {
      // Verificar si la nueva contraseña y su confirmación coinciden
      if (this.contrasenaNueva !== this.contrasenaNuevaDos) {
        // Muestra un mensaje de error si no coinciden
        this.alertService.showAlert('Error', 'Las contraseñas no coinciden');
        console.error('Las contraseñas no coinciden');
        return;
      }

      // Obtén la contraseña existente del usuario
      const usuarioId = 'ZAyfDti56QdH0xO9rbtg'; // Reemplaza con el ID del usuario actual
      const usuarioDocRef = this.firestore.collection('contrasena').doc(usuarioId);

      // Obtén el valor del documento como una promesa
      const usuarioDoc = await usuarioDocRef.get().toPromise();

      // @ts-ignore
      if (!usuarioDoc.exists) {
        // El documento del usuario no existe, maneja el error según sea necesario
        this.alertService.showAlert('Error', 'Usuario no encontrado');
        console.error('Usuario no encontrado');
        return;
      }

      // Verificar si la contraseña anterior coincide con la contraseña en la base de datos
      // @ts-ignore
      const data = usuarioDoc.data() as { contrasena: string };
      if (data.contrasena !== this.contrasena) {
        // Muestra un mensaje de error si la contraseña anterior no coincide
        this.alertService.showAlert('Error', 'La contraseña anterior no es correcta');
        this.contrasena = '';
        this.contrasenaNueva= '';
        this.contrasenaNuevaDos= '';
        console.error('La contraseña anterior no es correcta');
        return;
      }

      // Actualizar la contraseña en la colección "contrasena" en Firestore
      await usuarioDocRef.update({ contrasena: this.contrasenaNueva });

      // Redirigir a alguna página de éxito o hacer algo después de la actualización
      this.alertService.showAlert('Éxito', 'Contraseña actualizada exitosamente');
      this.contrasena = '';
      this.contrasenaNueva= '';
      this.contrasenaNuevaDos= '';
      console.log('Contraseña actualizada exitosamente');
    } catch (error) {
      this.alertService.showAlert('Error', 'Error al actualizar la contraseña');
      this.contrasena = '';
      this.contrasenaNueva= '';
      this.contrasenaNuevaDos= '';
      console.error('Error al actualizar la contraseña:', error);
    }
  }
}
