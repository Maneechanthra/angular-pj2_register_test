import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  buy_date!: any;
  total_price!: any;
  selectedLotIds: any;
  totalPrice = 0;
  response: any;
  ac_id: any;
  showPreviousOrders = true;

  constructor(private dataService: DataService, private http: HttpClient) { }

  ngOnInit() {
    this.dataService.selectedLotIds$.subscribe((lot_id) => {
      this.selectedLotIds = lot_id;
      console.log('Selected Lot IDs:', lot_id);
      this.calculateTotalPrice();
    });
  }
  calculateTotalPrice() {
    this.totalPrice = this.selectedLotIds.reduce(
      (total: number, order: { quantity: number; price: number }) => {
        return total + order.quantity * order.price;
      },
      0
    );
  }

  confirmOrder() {
    if (this.selectedLotIds.length > 0) {
        Swal.fire({
            title: 'ยืนยันการสั่งซื้อ?',
            text: 'ยืนยันการสั่งซื้อหรือไม่?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.value) {
                console.log('ยืนยัน');

                const orderDetails = this.selectedLotIds.map((order: any) => ({
                    lot_id: order.lot_id,
                    amount: order.quantity,
                    price: order.price,
                    total_price: order.quantity * order.price,
                }));

                const ac_id = this.dataService.getAcId();

                const orderData = {
                    ac_id: ac_id,
                    grand_total: this.totalPrice,
                    details: orderDetails,
                };

                    console.log(orderData);


                // ส่งคำขอ HTTP POST ไปยัง API
                this.http
                    .post(this.dataService.apiendpoint + '/lottory/buy', orderData, {
                        observe: 'response',
                    })
                    .subscribe((response) => {
                        console.log(JSON.stringify(response.status));
                        console.log(JSON.stringify(response.body));

                        // ลบรายการที่สั่งซื้อจากรายการที่เลือก
                        orderDetails.forEach((orderDetail: any) => {
                            this.removeOrderFromList(orderDetail.lot_id);
                        });

                        Swal.fire({
                            title: 'สั่งซื้อสำเร็จ!',
                            text: 'คุณได้ทำการสั่งซื้อสำเร็จ',
                            icon: 'success',
                            confirmButtonText: 'ตกลง',
                        });

                        // รีเซ็ตค่าหลังจากสั่งซื้อ
                        this.selectedLotIds = [];
                        console.log(this.selectedLotIds);
                        this.totalPrice = 0;
                        this.resetSelectedLotIds();
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                console.log('ยกเลิก');
            }
        });
    } else {
        Swal.fire({
            title: 'ไม่มีรายการสั่งซื้อ',
            text: 'กรุณาเลือกรายการสั่งซื้อก่อน',
            icon: 'warning',
            confirmButtonText: 'ตกลง',
        });
    }
}
  resetSelectedLotIds() {
    this.dataService.selectedLotIdsSubject.next([]);
  }

  // buy(lot_id: any, amount: any, price: any, total_price: any) {
  //   const userData = {
  //     lot_id: lot_id,
  //     amount: amount,
  //     price: price,
  //     total_price: total_price
  //   };

  //   const jsonString = JSON.stringify(userData);
  //   console.log(jsonString);

  //   this.http
  //     .post(
  //       this.dataService.apiendpoint + '/lottory/buy_tick',
  //       jsonString,
  //       { observe: 'response' }
  //     )
  //     .subscribe((response) => {
  //       console.log(jsonString);
  //       console.log(JSON.stringify(response.status));
  //       console.log(JSON.stringify(response.body));

  //       Swal.fire({
  //         title: 'สั่งซื้อสำเร็จ!',
  //         text: 'คุณได้ทำการสั่งซื้อสำเร็จ',
  //         icon: 'success',
  //         confirmButtonText: 'ตกลง',
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           this.removeOrderFromList(lot_id);
  //         }
  //       });
  //     });
  // }

  removeOrderFromList(lot_id: any) {
    const indexToRemove = this.selectedLotIds.findIndex(
      (order: { lot_id: any }) => order.lot_id === lot_id
    );
    if (indexToRemove !== -1) {
      this.selectedLotIds.splice(indexToRemove, 1);
    }
  }

  removeOrder(lot_id: any) {
    const indexToRemove = this.selectedLotIds.findIndex(
      (order: { lot_id: any }) => order.lot_id === lot_id
    );
    if (indexToRemove !== -1) {
      Swal.fire({
        title: 'ยืนยันการลบ?',
        text: 'คุณต้องการลบรายการนี้หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        if (result.isConfirmed) {
          const removedOrder = this.selectedLotIds[indexToRemove];
          const removedOrderPrice = removedOrder.quantity * removedOrder.price;

          this.selectedLotIds.splice(indexToRemove, 1);
          this.totalPrice -= removedOrderPrice;

          Swal.fire({
            title: 'ลบสำเร็จ!',
            text: 'รายการถูกลบออกแล้ว',
            icon: 'success',
            confirmButtonText: 'ตกลง',
          });
        }
      });
    }
  }
}
