import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService} from "../Funciones/alert.service";
import { Router } from "@angular/router"

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
    private alertService:AlertService
  ) { }

  ngOnInit() {
  }

  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

  async register() {
    // Verifica si los valores en los campos de texto son "admin" y "admin"
    if (this.usuario === this.usuarioAcceso && this.contrasena === this.contrasenaAcceso) {
      this.router.navigate(['/menu_principal']);
      this.dismiss();
    } else {
      // Muestra un mensaje de error en caso de credenciales incorrectas
      await this.alertService.showAlert('Error', 'Credenciales incorrectas')
      console.log("Credenciales incorrectas. Usuario y contraseña deben ser 'admin'.");
    }
  }
}
