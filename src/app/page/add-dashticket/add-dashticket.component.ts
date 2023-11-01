import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddtricketComponent } from '../addtricket/addtricket.component';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import {
  Convert as LottoryCvt,
  Lottory,
} from 'src/app/model/lottery_ticket.model';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-dashticket',
  templateUrl: './add-dashticket.component.html',
  styleUrls: ['./add-dashticket.component.scss'],
})
export class AddDashticketComponent {
  lottory = Array<Lottory>();
  ticket_id: any;
  tableData: any[] = [];

  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddtricketComponent>,
    private http: HttpClient,
    private router: Router
  ) {
    http.get(dataService.apiendpoint + '/lottory').subscribe((data: any) => {
      this.lottory = LottoryCvt.toLottory(JSON.stringify(data));
    });

    this.dataSubject.subscribe((data) => {
      this.tableData = data; // ใช้ข้อมูลที่มาจาก BehaviorSubject ในการอัพเดทตารางหรือรายการข้อมูล
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  // สร้าง BehaviorSubject เพื่อเก็บข้อมูลตารางหรือรายการข้อมูล
  dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  // สร้างฟังก์ชันสำหรับอัพเดทข้อมูลในตารางหรือรายการข้อมูล
  updateData(newData: any[]) {
    this.dataSubject.next(newData);
  }

  addlottory(
    ticket_id: string,
    set_no: string,
    date_lot: string,
    round_no: string,
    price: string,
    amount: string
  ) {
    if (!ticket_id || !set_no || !date_lot || !round_no || !price || !amount) {
      Swal.fire({
        title: 'ข้อมูลไม่ครบ!',
        text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        icon: 'error',
        confirmButtonText: 'ตกลง',
      });
      return;
    }

    let requestBody = {
      ticket_id: ticket_id,
      set_no: set_no,
      round_no: round_no,
      price: price,
      amount: amount,
      date_lot: date_lot,
    };

    this.http
      .post(this.dataService.apiendpoint + '/dashboard/addlottory', requestBody)
      .subscribe(
        (response: any) => {
          this.lottory.push(response.data);

          Swal.fire({
            title: 'บันทึกข้อมูลสลากสำเร็จ!',
            text: 'คุณได้ทำการบันทึกข้อมูลสลากสำเร็จ',
            icon: 'success',
            confirmButtonText: 'ตกลง',
          });

          this.dialogRef.close();

          this.updateData(this.lottory);
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
}
