import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDashticketComponent } from '../add-dashticket/add-dashticket.component';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';

import { Convert as AccountCvt, Account } from 'src/app/model/account.model';
import {
  Convert as LottoryCvt,
  Lottory,
} from 'src/app/model/lottery_ticket.model';
import {
  Convert as BuyTicketCvt,
  LottoryBuyTicket,
} from './../../model/lottory_buy_ticket.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-ticket',
  templateUrl: './report-ticket.component.html',
  styleUrls: ['./report-ticket.component.scss'],
})
export class ReportTicketComponent implements OnInit {
  userData: any;
  lottory: Lottory[] = [];
  setNos: number[] = [];
  roundNos: number[] = [];
  optionsArray: number[] = [];
  pageSize = 10;

  account: any;
  lottory_total: any;
  totalBuytciket: any;

  currentPage: number = 1; // Current page
  itemsPerPage: number = 10; // Number of items per page
  filteredLottory: Lottory[] = [];
  selectedLotIds: any;

  constructor(
    private dataServive: DataService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    http.get(dataServive.apiendpoint + '/lottory').subscribe((data: any) => {
      this.lottory = LottoryCvt.toLottory(JSON.stringify(data));
      console.log(this.lottory);

      const setNosWithData = this.lottory.map((lottery) => lottery.set_no);
      this.setNos = Array.from(new Set(setNosWithData));
      this.setNos.sort((a, b) => a - b);
      this.optionsArray = this.setNos;

      const roundNosWithData = this.lottory.map((lottery) => lottery.round_no);
      this.roundNos = Array.from(new Set(roundNosWithData));
      this.roundNos.sort((a, b) => a - b);
      this.optionsArray = this.roundNos;
    });
    http.get(this.dataServive.apiendpoint + '/user').subscribe((data: any) => {
      this.account = AccountCvt.toAccount(JSON.stringify(data));
      console.log(this.account);
    });

    http
      .get(this.dataServive.apiendpoint + '/lottory')
      .subscribe((data: any) => {
        this.lottory_total = LottoryCvt.toLottory(JSON.stringify(data));
        console.log(this.lottory);
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

  loadData() {
    this.http
      .get(this.dataServive.apiendpoint + '/lottory')
      .subscribe((data: any) => {
        this.lottory = LottoryCvt.toLottory(JSON.stringify(data));
        console.log(this.lottory);
        this.updateFilteredLottory();
      });
  }

  updateFilteredLottory() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredLottory = this.lottory.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateFilteredLottory();
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.lottory.length / this.itemsPerPage)) {
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
    const pageCount = Math.ceil(this.lottory.length / this.itemsPerPage);
    return Array(pageCount)
      .fill(0)
      .map((x, i) => i + 1);
  }

  openDialog() {
    this.dialog.open(AddDashticketComponent, {
      width: '800px',
      height: '560px',
    });
  }

  openDialog_edit(
    lot_id: any,
    ticket_id: any,
    round_no: any,
    set_no: any,
    price: any,
    amount: any,
    date_lot: any
  ) {
    this.dialog.open(EditTicketComponent, {
      width: '800px',
      height: '560px',
      data: {
        lot_id: lot_id,
        ticket_id: ticket_id,
        round_no: round_no,
        set_no: set_no,
        price: price,
        amount: amount,
        date_lot: date_lot,
      },
    });
    console.log(lot_id, ticket_id, round_no, set_no, price, amount);
  }

  removelottory(lot_id: any) {
    // Confirm with the user before deleting
    Swal.fire({
      title: 'ยืนยันการลบ?',
      text: 'คุณต้องการลบรายการนี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่ใช่',
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms, send an HTTP DELETE request
        this.http
          .delete(`${this.dataServive.apiendpoint}/deletelottory/${lot_id}`)
          .subscribe(
            (response: any) => {
              // ลบสำเร็จ อัพเดทข้อมูลในตาราง
              this.filteredLottory = this.filteredLottory.filter(
                (lottory) => lottory.lot_id !== lot_id
              );
              Swal.fire({
                title: 'ลบสำเร็จ!',
                text: 'รายการถูกลบออกแล้ว',
                icon: 'success',
                confirmButtonText: 'ตกลง',
              });
              this.router.navigate(['/report_ticket']);
            },
            (error) => {
              // Show an error message if deletion fails
              Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถลบรายการได้',
                icon: 'error',
                confirmButtonText: 'ตกลง',
              });
            }
          );
      }
    });
  }
}
