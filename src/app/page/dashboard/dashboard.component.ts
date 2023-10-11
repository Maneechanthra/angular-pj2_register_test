import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Convert as AccountCvt, Account } from 'src/app/model/account.model';
import {
  Convert as LottoryCvt,
  Lottory,
} from 'src/app/model/lottery_ticket.model';
import {
  Convert as BuyTicketCvt,
  LottoryBuyTicket,
} from './../../model/lottory_buy_ticket.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  account: any;
  lottory: any;
  totalBuytciket: any;
  userData: any;
  selectedDate: any;
  dayData: any[];
  selectedMonth: any;
  monthData: any[];
  total_price_sum = 0;
  total_price_sum_day = 0;

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router
  ) {
    this.dayData = [];
    this.monthData = [];
    http.get(this.dataService.apiendpoint + '/user').subscribe((data: any) => {
      this.account = AccountCvt.toAccount(JSON.stringify(data));
      console.log(this.account);
    });

    http
      .get(this.dataService.apiendpoint + '/lottory')
      .subscribe((data: any) => {
        this.lottory = LottoryCvt.toLottory(JSON.stringify(data));
        console.log(this.lottory);
      });

    http
      .get(this.dataService.apiendpoint + '/lottory/buy_ticket/total')
      .subscribe((data: any) => {
        this.totalBuytciket = BuyTicketCvt.toLottoryBuyTicket(
          JSON.stringify(data)
        );
        console.log(this.totalBuytciket);
      });
  }

  ngOnInit() {
    this.dataService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
  }

  searchByDate() {
    if (!this.selectedDate) {
      return;
    }
    console.log(this.selectedDate);
    this.http
      .get(this.dataService.apiendpoint + '/dashboard/day/' + this.selectedDate)
      .subscribe(
        (data: any) => {
          this.dayData = data;
          const totalPriceSum = this.dayData.reduce(
            (total: number, current: any) => total + current.total_price,
            0
          );
          console.log(totalPriceSum);
          this.total_price_sum_day = totalPriceSum;
        },
        (error: any) => {
          console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล: ', error);
        }
      );
  }
  searchByMonth() {
    if (!this.selectedMonth) {
      return;
    }
    this.http
      .get(
        this.dataService.apiendpoint + '/dashboard/month/' + this.selectedMonth
      )
      .subscribe(
        (data: any) => {
          this.monthData = data;
          const totalPriceSum = this.monthData.reduce(
            (total: number, current: any) => total + current.total_price,
            0
          );
          console.log(totalPriceSum);
          this.total_price_sum = totalPriceSum;
        },
        (error: any) => {
          console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล: ', error);
        }
      );
  }
}
