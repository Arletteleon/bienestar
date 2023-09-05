import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { AlertService } from '../Funciones/alert.service';

// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface MyDocument {
  cupo: number;
  time: firebase.firestore.Timestamp;
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
      const collectionRef = this.firestore.collection<MyDocument>(
        'registrationTime'
      );

      // Obtener las fechas seleccionadas en el rango y establecer la hora en 00:00:00
      const startDate = new Date(this.fechaInicial);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(this.fechaFinal);
      endDate.setHours(23, 59, 59, 0);

      // Crear una referencia a la colección con las condiciones de consulta
      const queryRef = collectionRef.ref
        .where('time', '>=', startDate)
        .where('time', '<=', endDate);

      // Ejecutar la consulta
      const querySnapshot = await queryRef.get();

      querySnapshot.forEach((doc) => {
        const data = doc.data() as MyDocument;
        this.data.push(data);
      });

      console.log('Fecha Inicial:', startDate);
      console.log('Fecha Final:', endDate);

      const tableBody = [
        // Encabezados de la tabla
        [
          { text: 'Cupo', style: 'tableHeader', alignment: 'center' },
          { text: 'Fecha', style: 'tableHeader', alignment: 'center' },
          { text: 'Hora', style: 'tableHeader', alignment: 'center' },
          { text: 'Puntualidad', style: 'tableHeader', alignment: 'center' },
        ],
        // Datos de los registros
        ...this.data.map((item) => [
          { text: item.cupo.toString(), alignment: 'center' },
          { text: this.formatDate(item.time.toDate()), alignment: 'center' },
          { text: this.formatTime(item.time.toDate()), alignment: 'center' },
          { text: item.puntualidad, alignment: 'center' },
        ]),
      ];

      const documentDefinition = {
        // Configurar el informe
        content: [
          {
            text: 'Reporte de datos',
            style: 'header',
          },
          {
            table: {
              widths: ['auto', 'auto', 'auto', 'auto'],
              body: tableBody,
            },
          },
        ],
        styles: {
          header: {
            fontSize: 40,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10],
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black',
          },
        },
      };

      // @ts-ignore
      pdfMake.createPdf(documentDefinition).open();
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
