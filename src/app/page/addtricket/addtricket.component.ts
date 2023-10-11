import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtricket',
  templateUrl: './addtricket.component.html',
  styleUrls: ['./addtricket.component.scss'],
})
export class AddtricketComponent implements OnInit {
  // lottory = Array<Lottory>;

  selectedLottery: any;
  datalot: any;
  amount: any;
  response: any;
  selectedQuantity: number = 1; // กำหนดค่าเริ่มต้นเป็น 1

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddtricketComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedLottery = this.data;
    this.datalot = this.selectedLottery;
  }
  closeDialog() {
    this.dialogRef.close();
  }

  getNumberArray(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  addCart(lot_id: any, amount: any, price: any, ticket_id: any) {
    console.log(lot_id);

    // ตรวจสอบว่าสลากเหลือ 0 หรือไม่
    if (amount <= 0) {
      // แสดงข้อความ "ไม่สามารถซื้อสลากได้"
      Swal.fire({
        title: 'ไม่สามารถซื้อสลากได้',
        text: 'สลากขายหมดแล้ว',
        icon: 'warning',
        confirmButtonText: 'ตกลง',
      });
    } else {
      // เพิ่มรายการสั่งซื้อสลาก
      this.dataService.addSelectedLotId(
        lot_id,
        this.selectedQuantity,
        price,
        ticket_id
      );

      // แน่ใจว่าคุณเรียกใช้ updateSelectedLotCount หลังจาก addSelectedLotId
      this.dataService.updateSelectedLotCount();

      Swal.fire({
        title: 'ทำรายการสำเร็จ!',
        text: 'คุณได้ทำการเพิ่มรายการสั่งซื้อสำเร็จ',
        icon: 'success',
        confirmButtonText: 'ตกลง',
      });
      this.dialogRef.close();
    }
  }
}
