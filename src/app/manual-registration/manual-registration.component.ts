import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AngularFirestore} from "@angular/fire/compat/firestore";
import { InterfaceRegistrationTime} from "../interface/interface.registration.time";

@Component({
  selector: 'app-manual-registration',
  templateUrl: './manual-registration.component.html',
  styleUrls: ['./manual-registration.component.css'],
})
export class ManualRegistrationComponent  implements OnInit {

  currentDate: string | undefined;
  date: string | undefined;
  cupo:string='';
  user: InterfaceRegistrationTime = {
    cupo: '',
    time: new Date()
  };
  constructor(
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    moment.locale('es')
    setInterval(() => {
      const now = moment();
      this.currentDate = now.format('HH:mm:ss');
      this.date = now.format('dddd, D [de] MMMM [de] YYYY');
    }, 1000);
  }

  registerManual(){
    this.firestore.collection('registrationTime').add(this.user);
  }
}
