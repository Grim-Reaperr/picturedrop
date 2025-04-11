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

  public BarChart: any;
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Bilder',
        data: [2, 2, 2],
        backgroundColor: '#4e73df',
        borderColor: '#4e73df',
        borderWidth: 1,
      },
      {
        label: 'Videos',
        data: [2, 3, 4],
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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    this.fetchSubmissionItems();
    this.BarChart = new Chart('BarChart', {type: 'bar', data: this.chartData, options: this.chartOptions});
  }

  fetchSubmissionItems(): void {
    this.http.get<{
      [year: string]: { [month: string]: { images: number; videos: number } }
    }>('api/submission-items/grouped-data')
      .subscribe((groupedData) => {
        console.log(groupedData);
        this.formatChartData(groupedData);
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

    this.chartData.labels = labels;
    this.chartData.datasets[0].data = imagesData;
    this.chartData.datasets[1].data = videosData;
  }
}
