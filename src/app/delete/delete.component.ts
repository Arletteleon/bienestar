import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { InterfaceRegister } from '../register/interface.register';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit, OnDestroy {
  @ViewChild(DeleteComponent) _GoogleMap: DeleteComponent | undefined;

  cupo: string = '';
  users: Observable<any[]> | undefined;
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

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {}

  ngOnDestroy() {}

  searchUser() {
    console.log(this.cupo);
    this.firestore
      .collection<InterfaceRegister>('users', (ref) =>
        ref.where('cupo', '==', parseInt(this.cupo))
      )
      .valueChanges() // Modificación aquí
      .subscribe((users: InterfaceRegister[]) => { // Modificación aquí
        this.users = of(users); // Modificación aquí
      });
    this.cupo = '';
  }

  deleteUser() {
    this.firestore
      .collection<InterfaceRegister>('users', (ref) =>
        ref.where('cupo', '==', parseInt(this.cupo))
      )
      .get()
      .toPromise()
      .then((querySnapshot) => {
        // @ts-ignore
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
    this.cupo = '';
  }
}
