import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userData: any;
  selectedQuantity: any;

  userFirstName: string = ''; // เก็บชื่อจาก localStorage
  userLastName: string = ''; // เก็บนามสกุลจาก localStorage

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    this.dataService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
    this.dataService.selectedLotIds$.subscribe((selectedLotIds) => {
      this.selectedQuantity = selectedLotIds.length;
    });
  }

  // ngOnInit() {
  //   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  //   if (isLoggedIn) {
  //   }

  //   this.dataService.userData$.subscribe((userData) => {
  //     this.userData = userData;
  //   });
  //   this.dataService.selectedLotIds$.subscribe((selectedLotIds) => {
  //     this.selectedQuantity = selectedLotIds.length;
  //   });
  // }

  // ngOnInit() {
  //   // ตรวจสอบว่ามีข้อมูลผู้ใช้ที่เก็บใน localStorage
  //   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  //   if (isLoggedIn) {
  //     // ดึงชื่อผู้ใช้จาก localStorage
  //     const userName = localStorage.getItem('userName');

  //     // ตรวจสอบว่ามีชื่อผู้ใช้หรือไม่
  //     if (userName) {
  //       this.userData = userName;
  //     }

  //     // อัพเดตข้อมูลผู้ใช้จาก localStorage โดยอัพเดตทุกครั้งที่มีการเปลี่ยนแปลงใน localStorage
  //     window.addEventListener('storage', (event) => {
  //       if (event.key === 'userName') {
  //         this.userData = event.newValue;
  //       }
  //     });
  //   }

  //   this.dataService.selectedLotIds$.subscribe((selectedLotIds) => {
  //     this.selectedQuantity = selectedLotIds.length;
  //   });
  // }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('ac_id');
    this.userData = null;
    this.router.navigate(['/login']);
  }
}
