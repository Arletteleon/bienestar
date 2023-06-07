import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Contras} from "../interface/contras";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  cupo: string = '';
  password: string = '';

  data : Contras={
     cupo:'',
    contra:''
};
  constructor(private firestore: AngularFirestore, private router: Router) {}

  async login() {
    try {
      const userDoc = await this.firestore.collection('users').doc(this.cupo).get().toPromise();
      const userData = userDoc?.data() || {}; // Asignar un objeto vacío si userDoc es undefined

      // @ts-ignore
      if (userData.contra && userData.contra === this.password) {
        // Credenciales válidas, redirige a la página deseada
        this.router.navigate(['/dashboard']);
      } else {
        // Credenciales inválidas, muestra un mensaje de error o realiza alguna acción adicional
        console.error('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

}
