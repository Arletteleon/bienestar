import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertService } from '../Funciones/alert.service';
import * as XLSX from 'xlsx';
import firebase from "firebase/compat/app";

// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface MyDocument {
  cupo: number;
  time: firebase.firestore.Timestamp; // Mantén el tipo como Timestamp
  puntualidad: String;
}

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent {
  data: MyDocument[] = [];
  fechaInicial: string = '';
  fechaFinal: string = '';
  seleccion: string = "Todos";

  constructor(
    private firestore: AngularFirestore,
    private alertService: AlertService
  ) {}

  async generateReport() {
    this.data = [];

    if (!this.fechaInicial || !this.fechaFinal) {
      this.alertService.showAlert('Error', 'Ingrese un periodo de consulta');
      return; // Salir de la función si las fechas no están definidas
    }

    try {
      const collectionRef = this.firestore.collection<MyDocument>('registrationTime');

      const startDate = new Date(this.fechaInicial);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(this.fechaFinal);
      endDate.setHours(23, 59, 59, 0);

      let queryRef = collectionRef.ref
        .where('puntualidad', '==', this.seleccion)
        .where('time', '>=', startDate)
        .where('time', '<=', endDate);

      if (this.seleccion == "Todos") {
        queryRef = collectionRef.ref
          .where('time', '>=', startDate)
          .where('time', '<=', endDate);
      }

      const querySnapshot = await queryRef.get();

      querySnapshot.forEach((doc) => {
        const data = doc.data() as MyDocument;
        const date = data.time.toDate();
        this.data.push(data);
      });

      console.log('Fecha Inicial:', startDate);
      console.log('Fecha Final:', endDate);

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Reporte');

      XLSX.writeFile(wb, 'reporte.xlsx');

    } catch (error) {
      console.error('Error al generar el reporte', error);
    }
  }

  // Función para formatear la fecha como 'dd/mm/yyyy'
  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Función para formatear la hora como 'hh:mm'
  formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  }
}
