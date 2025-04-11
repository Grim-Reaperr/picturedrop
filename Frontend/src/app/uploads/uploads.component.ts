import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartData } from 'chart.js';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-uploads', // Komponente umbenennen
  templateUrl: './uploads.component.html', // Update den Template-Name
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  // Balkendiagrammdaten
  chartData: ChartData<'bar'> = {
    labels: [],  // Labels für Jahr und Monat
    datasets: [
      {
        label: 'Bilder',
        data: [],
        backgroundColor: '#4e73df',
        borderColor: '#4e73df',
        borderWidth: 1,
      },
      {
        label: 'Videos',
        data: [],
        backgroundColor: '#1cc88a',
        borderColor: '#1cc88a',
        borderWidth: 1,
      },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      },
    },
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
     this.fetchSubmissionItems();
  }

  // Holen der SubmissionItems vom Backend
  fetchSubmissionItems(): void {
    this.http.get<any>('api/submission-items')
      .subscribe((response) => {
        console.log(response.submissionItems);
        this.groupAndFormatData(response.submissionItems);
      });
  }

  // Gruppierung der SubmissionItems nach Jahr und Monat
  groupAndFormatData(submissionItems: any[]): void {
    const groupedData: any = {};

    submissionItems.forEach(item => {
      const createdOn = new Date(item.CreatedOn);
      const year = createdOn.getFullYear();  // Jahr extrahieren
      const month = createdOn.getMonth();   // Monat extrahieren (0 = Januar, 1 = Februar, etc.)

      // Initialisierung der Jahr-Monat-Gruppe
      if (!groupedData[year]) {
        groupedData[year] = {};
      }

      if (!groupedData[year][month]) {
        groupedData[year][month] = { images: 0, videos: 0 };
      }

      // Zählen, ob es sich um ein Bild oder Video handelt
      if (item.ContentType.includes('image')) {
        groupedData[year][month].images += 1;
      } else if (item.ContentType.includes('video')) {
        groupedData[year][month].videos += 1;
      }
    });

    this.formatChartData(groupedData);
  }

  // Umwandlung der gruppierten Daten für das Balkendiagramm
  formatChartData(groupedData: { [year: string]: { [month: string]: { images: number; videos: number } } }): void {
    const labels: string[] = [];
    const imagesData: number[] = [];
    const videosData: number[] = [];

    Object.keys(groupedData).forEach(year => {
      Object.keys(groupedData[year]).forEach(month => {
        const label = `${year}-${month + 1}`; // Monat anzeigen (1-basiert)
        labels.push(label);
        imagesData.push(groupedData[year][month].images);
        videosData.push(groupedData[year][month].videos);
      });
    });

    // Setze die formatierten Daten in das Diagramm
    this.chartData.labels = labels;
    this.chartData.datasets[0].data = imagesData;
    this.chartData.datasets[1].data = videosData;
  }
}
