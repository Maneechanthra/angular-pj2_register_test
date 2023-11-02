// import { Lottory } from './../../model/lottery_ticket.model';
import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import {
  Convert as LottoryCvt,
  Lottory,
} from 'src/app/model/lottery_ticket.model';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddtricketComponent } from '../addtricket/addtricket.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-tricket',
  templateUrl: './buy-tricket.component.html',
  styleUrls: ['./buy-tricket.component.scss'],
})
export class BuyTricketComponent {
  lottory = Array<Lottory>();
  num_1!: any;
  num_2!: any;
  num_3!: any;
  num_4!: any;
  num_5!: any;
  num_6!: any;
  set_on: any;
  round_no!: any;

  selectedSetNo: any;
  setNos: number[] = [];
  roundNos: number[] = [];
  optionsArray: number[] = [];
  searchedLottory: Lottory[] = [];

  pageSize = 15;
  currentPage = 1;
  lotteryPerPage: Lottory[] = [];
  ac_id: any;
  userData: any;
  selectedQuantity: any;

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {
    http.get(dataService.apiendpoint + '/lottory').subscribe((data: any) => {
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

      this.loadLotteryData();
    });

    this.dataService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
  }

  //dialog addticket Function
  openDialog(
    lot_id: any,
    ticket_id: any,
    round_no: any,
    set_no: any,
    price: any,
    amount: any
  ) {
    const ac_id = this.dataService.getAcId();

    if (ac_id !== null && ac_id !== undefined) {
      this.dialog.open(AddtricketComponent, {
        width: '500px',
        data: {
          lot_id: lot_id,
          ticket_id: ticket_id,
          round_no: round_no,
          set_no: set_no,
          price: price,
          amount: amount,
          ac_id: ac_id, // ส่ง ac_id ไปใน Dialog
        },
      });
      console.log(ac_id);
    } else {
      Swal.fire({
        title: 'กรุณาเข้าสู่ระบบ!',
        text: 'ต้องเข้าสู่ระบบก่อนถึงซื้อได้',
        icon: 'info',
        confirmButtonText: 'ตกลง',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']); // นำทางไปยังหน้า Login
        }
      });
    }
  }

  searchTicket() {
    let requestBody = {
      ticket_id: null,
      // ticket_id6: null,
      set_no: null,
      round_no: null,
    };

    if (this.num_4 || this.num_5 || this.num_6) {
      requestBody.ticket_id = this.num_4 + this.num_5 + this.num_6;
    }
    if (this.selectedSetNo) {
      requestBody.set_no = this.selectedSetNo;
    }

    if (this.round_no) {
      requestBody.round_no = this.round_no;
    }

    console.log(requestBody);

    this.http
      .post(`${this.dataService.apiendpoint}/lottery`, requestBody)
      .subscribe((data: any) => {
        this.lottory = LottoryCvt.toLottory(JSON.stringify(data));

        if (this.lottory.length > 0) {
          this.searchedLottory = this.lottory;
        } else {
          Swal.fire({
            title: 'ไม่พบข้อมูลที่ค้นหา!',
            text: 'ไม่พบข้อมูลสลากที่ค้นหา',
            icon: 'warning',
            confirmButtonText: 'ตกลง',
          });
          this.searchedLottory = [];
        }
        console.log(this.lottory);
      });
  }

  resetForm() {
    this.num_1 = '';
    this.num_2 = '';
    this.num_3 = '';
    this.num_4 = '';
    this.num_5 = '';
    this.num_6 = '';
    this.selectedSetNo = '';
    this.round_no = '';

    let requestBody = {
      ticket_id: null,
      set_no: null,
      round_no: null,
    };

    this.http
      .post(`${this.dataService.apiendpoint}/lottery`, requestBody)
      .subscribe((data: any) => {
        this.lottory = LottoryCvt.toLottory(JSON.stringify(data));

        if (this.lottory.length > 0) {
          this.searchedLottory = this.lottory;
        } else {
          this.searchedLottory = [];
        }
        console.log(this.lottory);
      });
  }

  //Page size
  loadLotteryData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.lotteryPerPage = this.lottory.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLotteryData();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.lottory.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.loadLotteryData();
    }
  }
}
