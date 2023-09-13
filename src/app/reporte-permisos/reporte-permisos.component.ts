import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CupoCheck } from '../Funciones/cupo.check';
import { AlertService } from '../Funciones/alert.service';
import firebase from 'firebase/compat/app';

// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface MyDocument {
  cupo: string;
  diasPermiso: number;
  fechaPermiso: Date;
  name: string;
  observaciones: string;
  url: string;
}

@Component({
  selector: 'app-reporte-permisos',
  templateUrl: './reporte-permisos.component.html',
  styleUrls: ['./reporte-permisos.component.css'],
})
export class ReportePermisosComponent {
  cupo: string = '';
  fechaInicio: string = '';
  fechaFinal: string = '';
  data: MyDocument[] = [];

  constructor(
    private firestore: AngularFirestore,
    private cupoCheckService: CupoCheck,
    private alertService: AlertService
  ) {}


  ionViewWillEnter() {
    // Restablecer los valores de los campos aquí
    this.cupo = '';
    this.fechaInicio='';
    this.fechaFinal='';
  }
  onInputValueChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Elimina caracteres no numéricos utilizando una expresión regular
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Actualiza el valor del ion-input
    inputElement.value = numericValue;

    // Actualiza el modelo (ngModel) con el valor numérico
    this.cupo = numericValue;
  }
  async generateReport() {
    this.data = [];

    if (!this.fechaInicio || !this.fechaFinal) {
      this.alertService.showAlert('Error', 'Ingrese el rango de fechas');
      return;
    }

    try {
      const cupoExists = await this.cupoCheckService.checkCupoExistence(parseInt(this.cupo));
      if (!cupoExists) {
        this.alertService.showAlert('Error', 'El cupo no existe');
        return;
      }

      const collectionRef = this.firestore.collection<MyDocument>('imagenes');

      // Convertir las fechas a objetos Date
      const startDate = new Date(this.fechaInicio);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(this.fechaFinal);
      endDate.setHours(23, 59, 59, 0);

      console.log('Fecha Inicial:', startDate);
      console.log('Fecha Final:', endDate);

      const queryRef = collectionRef.ref
        .where('cupo', '==', parseInt(this.cupo))
        .where('fechaPermiso', '>=', startDate)
        .where('fechaPermiso', '<=', endDate);

      console.log('Consulta de Firebase:', queryRef.toString());

      const querySnapshot = await queryRef.get();
      querySnapshot.forEach((doc) => {
        const data = doc.data() as MyDocument;
        // Convierte la fecha de Timestamp a Date si es necesario
        if (data.fechaPermiso instanceof firebase.firestore.Timestamp) {
          data.fechaPermiso = data.fechaPermiso.toDate();
        }
        this.data.push(data);
      });
      console.log('Datos recuperados de Firebase:', this.data);

      if (this.data.length > 0) {
        // Formatear la fecha como cadena antes de pasarla a pdfMake

        const tableBody = [
          // Encabezados de la tabla
          [
            { text: 'Cupo', style: 'tableHeader', alignment: 'center' },
            { text: 'Fecha de Permiso', style: 'tableHeader', alignment: 'center' },
            { text: 'Días de Permiso', style: 'tableHeader', alignment: 'center' },
            { text: 'Observaciones', style: 'tableHeader', alignment: 'center' },
            { text: 'URL', style: 'tableHeader', alignment: 'center' },
          ],
          // Datos de los registros formateados
          ...this.data.map((item) => [
            { text: item.cupo ? item.cupo.toString() : '', alignment: 'center' },
            { text: this.formatDate(item.fechaPermiso), alignment: 'center' },
            { text: item.diasPermiso ? item.diasPermiso.toString() : '', alignment: 'center' },
            { text: item.observaciones || '', alignment: 'center' },
            { text: 'Documento', link: item.url, alignment: 'center', color: 'blue', decoration: 'underline'},
          ]),
        ];

        const documentDefinition = {
          // Configurar el informe
          content: [
            {
              text: 'Reporte de Permisos',
              style: 'header',
            },
            {
              table: {
                widths: ['auto', 'auto', 'auto', 'auto','auto'],
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
      } else {
        this.alertService.showAlert('Error', 'No se encontraron registros en el rango de fechas.');
      }
    } catch (error) {
      console.error('Error generando el informe:', error);
      this.alertService.showAlert('Error', 'Ocurrió un error al generar el informe.');
    }
  }
  // Función para formatear la fecha como 'dd/mm/yyyy'
  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
