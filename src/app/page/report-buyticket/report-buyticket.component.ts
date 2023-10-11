import { Component } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import {
  Convert as DashboardBuyTicketCvt,
  DashboardBuyTicket,
} from './../../model/dashboard_buyticket.model';

@Component({
  selector: 'app-report-buyticket',
  templateUrl: './report-buyticket.component.html',
  styleUrls: ['./report-buyticket.component.scss'],
})
export class ReportBuyticketComponent {
  userData: any;
  account = Array<Account>();
  lottory_total: any;
  totalBuytciket: any;
  report = Array<DashboardBuyTicket>();

  constructor(
    private dataServive: DataService,
    private router: Router,
    private http: HttpClient
  ) {

    http.get(this.dataServive.apiendpoint + '/lottery/report_buy').subscribe((data: any) => {
      this.report = DashboardBuyTicketCvt.toDashboardBuyTicket(JSON.stringify(data));
      console.log(this.report);
    });

    http.get(this.dataServive.apiendpoint + '/user').subscribe((data: any) => {
      this.account = AccountCvt.toAccount(JSON.stringify(data));
      console.log(this.account);
    });



    http
      .get(this.dataServive.apiendpoint + '/lottory')
      .subscribe((data: any) => {
        this.lottory_total = LottoryCvt.toLottory(JSON.stringify(data));
        console.log(this.lottory_total);
      });

    http
      .get(this.dataServive.apiendpoint + '/lottory/buy_ticket/total')
      .subscribe((data: any) => {
        this.totalBuytciket = BuyTicketCvt.toLottoryBuyTicket(
          JSON.stringify(data)
        );
        console.log(this.totalBuytciket);
      });
  }
  ngOnInit() {
    this.dataServive.userData$.subscribe((userData) => {
      this.userData = userData;
    });
  }
}
