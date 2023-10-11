import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent {
  lottoryhistory: any[] = []; // Declare the lottoryhistory array with an appropriate type if possible

  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit(): void {
    const ac_id = this.dataService.getAcId();

    this.http.get<any[]>(`${this.dataService.apiendpoint}/lottery/history/${ac_id}`)
      .subscribe((data) => {
        this.lottoryhistory = data;
        console.log(this.lottoryhistory);
      });
  }

}
