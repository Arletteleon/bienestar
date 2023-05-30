import {Component, OnDestroy, OnInit} from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import {Observable,of} from 'rxjs';
import { InterfaceRegister} from "../register/interface.register";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit,OnDestroy {


  cupo:string='';
  users$: Observable<any[]> | undefined;
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

  constructor(private db: AngularFireDatabase) {
    this.user.name="gdsgs";
    this.user.cupo="wfafaw";
    this.user.curp="";
    this.user.rfc="";
    this.user.state="";
    this.user.job="";
    this.user.hiring="";
    this.user.dateAdmission=new Date();
  }
  ngOnInit(){
  }
  ngOnDestroy() {
  }

  searchUser() {
    console.log(this.cupo)
    this.users$ = this.db.list<InterfaceRegister>(
      '/users', ref => ref.orderByChild('cupo').equalTo(parseInt(this.cupo))).valueChanges();
    this.cupo='';
  }

  deleteUser() {
    this.db.list('/users', ref => ref.orderByChild('cupo').equalTo(parseInt(this.cupo)))
      .snapshotChanges()
      .subscribe(users => {
        users.forEach(user => {
          this.db.object(`/users/${user.key}`).remove();
          this.cupo='';
        });
      });
  }
}
