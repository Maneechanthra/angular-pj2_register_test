import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import {
  Convert as LottoryCvt,
  Lottory,
} from 'src/app/model/lottery_ticket.model';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss'],
})
export class EditTicketComponent implements OnInit {
  lottory = Array<Lottory>();
  selectedLottery: any;
  datalot: any;

  filteredLottory = Array<Lottory>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditTicketComponent>,
    private dataService: DataService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {
    http.get(dataService.apiendpoint + '/lottory').subscribe((data: any) => {
      this.lottory = LottoryCvt.toLottory(JSON.stringify(data));
    });
  }

  ngOnInit(): void {
    this.selectedLottery = this.data;
    this.datalot = this.selectedLottery;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  editlottory(
    lot_id: any,
    ticket_id: any,
    set_no: any,
    date_lot: any,
    round_no: any,
    price: any,
    amount: any
  ) {
    Swal.fire({
      title: 'ยืนยันการบันทึก?',
      text: 'คุณต้องการบันทึกข้อมูลรายการนี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่ใช่',
    }).then((result) => {
      if (result.isConfirmed) {
        if (
          !ticket_id ||
          !set_no ||
          !date_lot ||
          !round_no ||
          !price ||
          !amount
        ) {
          Swal.fire({
            title: 'ข้อมูลไม่ครบ!',
            text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
            icon: 'error',
            confirmButtonText: 'ตกลง',
          });
          return;
        }
        let requestBody = {
          lot_id: lot_id,
          ticket_id: ticket_id,
          set_no: set_no,
          date_lot: date_lot,
          round_no: round_no,
          price: price,
          amount: amount,
        };

        this.http
          .post(
            this.dataService.apiendpoint + '/dashboard/editlottory',
            requestBody
          )
          .subscribe(
            (response: any) => {
              this.filteredLottory = this.filteredLottory.filter(
                (lottory) => lottory.lot_id !== lot_id,

                console.log(this.filteredLottory)
              );
              Swal.fire({
                title: 'บันทึกข้อมูลสลากสำเร็จ!',
                text: 'คุณได้ทำการบันทึกข้อมูลสลากสำเร็จ',
                icon: 'success',
                confirmButtonText: 'ตกลง',
              });
              this.dialogRef.close();
            },
            (error) => {
              Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถบันทึกข้อมูลสลากได้',
                icon: 'error',
                confirmButtonText: 'ตกลง',
              });
            }
          );
      }
    });
  }
}
