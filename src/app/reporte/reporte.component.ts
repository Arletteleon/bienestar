import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { AlertService } from '../Funciones/alert.service';
import fetch from "node-fetch";

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

      // Descargar la imagen desde la URL y convertirla a base64 (dataURL)
      const imageUrl =
        'https://crossorigin.me/https://img.asmedia.epimg.net/resizer/hCBY2mRfscMGi1-79fBwyWVY114=/1472x1104/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/7O7M5KDAJRGKLNDHFYSYCXOKLA.jpg'

      const response = await fetch(imageUrl);
      const imageBuffer = await response.buffer();
      const imageDataURL =
        'data:image/jpeg;base64,' + imageBuffer.toString('base64');

      const documentDefinition = {
        // Configurar el informe
        content: [
          {
            text: 'Reporte de datos',
            style: 'header',
          },
          {
            text: 'Detalles de registros:',
            style: 'subheader',
            margin: [0, 10],
          },
          // Agrega los detalles de los registros de manera personalizada
          ...this.data.map((item) => [
            {
              text: `Cupo: ${item.cupo}`,
              bold: true,
              fontSize: 14,
              margin: [0, 5],
            },
            {
              text: `Fecha de entrada: ${item.time
                .toDate()
                .toLocaleString()}`,
              margin: [0, 0, 0, 5],
            },
            {
              text: `Puntualidad: ${item.puntualidad}`,
              margin: [0, 0, 0, 10],
            },
            // Puedes agregar más detalles aquí según tus necesidades
          ]),
          {
            // Usa el dataURL de la imagen descargada
            image: imageDataURL,
            width: 200, // Ancho de la imagen en puntos
            height: 100, // Alto de la imagen en puntos
            margin: [0, 10],
          },
        ],
        styles: {
          header: {
            fontSize: 40,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 20,
            bold: true,
            margin: [0, 10],
          },
        },
      };

      // @ts-ignore
      pdfMake.createPdf(documentDefinition).open();
    } catch (error) {
      console.error('Error al generar el reporte', error);
    }
  }
}
