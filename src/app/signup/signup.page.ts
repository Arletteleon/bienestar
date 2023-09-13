import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService} from "../Funciones/alert.service";
import { Router } from "@angular/router"
import { AngularFireAuth} from "@angular/fire/compat/auth"; // Importa AngularFireAuth
import { AngularFirestore} from "@angular/fire/compat/firestore"; // Importa AngularFirestore


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  usuario: string = ""; // Variable para almacenar el valor del campo de usuario
  usuarioAcceso:string="admin"
  contrasena: string = ""; // Variable para almacenar el valor del campo de contraseña
  contrasenaAcceso:string="admin"

  constructor(
    public modalCtrl: ModalController,
    private router: Router,
    private alertService:AlertService,

    private afAuth: AngularFireAuth, // Inyecta AngularFireAuth
    private firestore: AngularFirestore // Inyecta AngularFirestore
  ) { }

  ngOnInit() {
  }

  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

  async register() {
    try {

      // Consulta la colección "contrasena" para buscar el documento con el UID coincidente
      const querySnapshot = await this.firestore.collection('contrasena').ref.where('usuario', '==', this.usuario).where('contrasena', '==', this.contrasena).get();

      if (!querySnapshot.empty) {
        // Las credenciales son válidas, redirige al usuario
        this.router.navigate(['/menu_principal']);
        this.dismiss();
      } else {
        // Muestra un mensaje de error en caso de credenciales incorrectas
        await this.alertService.showAlert('Error', 'Ingrese las credenciales correctas');
        console.log("Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al autenticar y consultar Firestore: ", error);
      // Maneja el error según tus necesidades
    }
  }
}
