import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  Convert as LottoryHistoryCvt,
  LottoryHistory,
} from 'src/app/model/lottory_history.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
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

    const filteredData = this.lottoryhistory.filter((order: any) => {
      const orderDate = new Date(order.buy_date).toISOString().split('T')[0];
      return orderDate === this.selectedDate;
    });

    if (filteredData.length === 0) {
      this.searchedLottory = [
        { noData: 'No data available for the selected date.' },
      ];
    } else {
      this.searchedLottory = filteredData;
    }
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
