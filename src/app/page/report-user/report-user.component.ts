import { HttpClient } from '@angular/common/http';
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

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.scss'],
})
export class ReportUserComponent {
  userData: any;
  account = Array<Account>();
  lottory_total: any;
  totalBuytciket: any;

  account_page: any[] = [];

  totalItems = 0;

  currentPage: number = 1; // Current page
  itemsPerPage: number = 5; // Number of items per page
  filteredAc: Account[] = [];

  constructor(
    private dataServive: DataService,
    private router: Router,
    private http: HttpClient
  ) {
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
      this.loadData();
    });
  }

  //=====================================================
  loadData() {
    this.http
      .get(this.dataServive.apiendpoint + '/user')
      .subscribe((data: any) => {
        this.account = AccountCvt.toAccount(JSON.stringify(data));
        console.log(this.account);
        this.updateFilteredLottory();
      });
  }

  updateFilteredLottory() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredAc = this.account.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateFilteredLottory();
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.account.length / this.itemsPerPage)) {
      this.currentPage++;
      this.updateFilteredLottory();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredLottory();
    }
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.account.length / this.itemsPerPage);
    return Array(pageCount)
      .fill(0)
      .map((x, i) => i + 1);
  }
}
