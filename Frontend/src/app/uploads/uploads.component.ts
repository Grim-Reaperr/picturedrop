import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChartData, ChartOptions} from 'chart.js';
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {





  constructor(private http: HttpClient) {
  }

  public chart: any;

  ngOnInit(): void {
    this.fetchSubmissionItems(); // Nur Daten laden
  }

  fetchSubmissionItems(): void {
    this.http.get<{
      [year: string]: { [month: string]: { images: number; videos: number } }
    }>('api/submission-items/grouped-data')
      .subscribe((groupedData) => {
        console.log(groupedData);
        this.formatChartData(groupedData); // Chart wird dort erstellt
      });
  }

  formatChartData(groupedData: { [year: string]: { [month: string]: { images: number; videos: number } } }): void {
    const labels: string[] = [];
    const imagesData: number[] = [];
    const videosData: number[] = [];

    Object.keys(groupedData).forEach(year => {
      Object.keys(groupedData[year]).forEach(month => {
        const label = `${year}-${String(Number(month)).padStart(2, '0')}`; // z.B. "2024-02"
        labels.push(label);
        imagesData.push(groupedData[year][month].images);
        videosData.push(groupedData[year][month].videos);
      });
    });
  console.log("labels")
    console.log(labels)
    console.log("imagesData")
    console.log(imagesData)
    console.log("videosData")
    console.log(videosData)
    this.createChart(labels, imagesData, videosData);
  }

  createChart(labels: string[], imagesData: number[], videosData: number[]): void {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Fotos",
            data: imagesData,
            backgroundColor: 'lightblue'
          },
          {
            label: "Videos",
            data: videosData,
            backgroundColor: 'orange'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Uploads'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Monat'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Anzahl'
            }
          }
        }
      }
    });
  }

}
