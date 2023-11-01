import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
})
export class ReportDetailComponent {
  lottoryhistory: any[] = [];
  searchedLottory: any[] = [];
  searchNumber: string = '';

  num_1: string = '';
  num_2: string = '';
  num_3: string = '';
  num_4: string = '';
  num_5: string = '';
  num_6: string = '';
  orderDate: string = '';

  selectedDate: any;
  dayData: any[];
  total_price_sum_day = 0;

  constructor(private dataService: DataService, private http: HttpClient) {
    this.dayData = [];
  }

  ngOnInit(): void {
    const ac_id = this.dataService.getAcId();
    this.http
      .get<any[]>(`${this.dataService.apiendpoint}/lottery/history/${ac_id}`)
      .subscribe((data) => {
        this.lottoryhistory = data;
      });
  }

  searchTicket() {
    if (
      this.num_1 ||
      this.num_2 ||
      this.num_3 ||
      this.num_4 ||
      this.num_5 ||
      this.num_6
    ) {
      this.searchedLottory = this.lottoryhistory.filter((order: any) => {
        const ticketId = order.ticket_id.toString();
        return (
          (this.num_1 === '' || ticketId.charAt(0) === this.num_1) &&
          (this.num_2 === '' || ticketId.charAt(1) === this.num_2) &&
          (this.num_3 === '' || ticketId.charAt(2) === this.num_3) &&
          (this.num_4 === '' || ticketId.charAt(3) === this.num_4) &&
          (this.num_5 === '' || ticketId.charAt(4) === this.num_5) &&
          (this.num_6 === '' || ticketId.charAt(5) === this.num_6)
        );
      });
    } else {
      this.searchedLottory = [];
    }
  }

  searchByDate() {
    if (!this.selectedDate) {
      this.searchedLottory = [];
      return;
    }
    this.searchedLottory = this.lottoryhistory.filter((order: any) => {
      const orderDate = new Date(order.buy_date).toISOString().split('T')[0];
      return orderDate === this.selectedDate;
    });
  }

  resetForm() {
    this.num_1 = '';
    this.num_2 = '';
    this.num_3 = '';
    this.num_4 = '';
    this.num_5 = '';
    this.num_6 = '';
    this.selectedDate = '';

    const ac_id = this.dataService.getAcId();
    this.http
      .get<any[]>(`${this.dataService.apiendpoint}/lottery/history/${ac_id}`)
      .subscribe((data) => {
        this.lottoryhistory = data;
      });

    if (this.lottoryhistory.length === 0) {
      this.searchedLottory = this.searchedLottory;
    } else {
      this.searchedLottory = [];
    }
    console.log(this.searchedLottory);
  }
}
