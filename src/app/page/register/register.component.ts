import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  fname!: any;
  lname!: any;
  email!: any;
  password!: any;
  tel_number!: any;
  bdate!: any;
  response: any;

  constructor(private data: DataService, private http: HttpClient,private router: Router) { }

  // save() {
  //   if (this.isValidDate(this.bdate)) {
  //     const userData = {
  //       fname: this.fname,
  //       lname: this.lname,
  //       email: this.email,
  //       password: this.password,
  //       tel_number: this.tel_number,
  //       bdate: this.bdate
  //     };

  //     let jsonString = JSON.stringify(userData);
  //     this.http.post(this.data.apiendpoint + "/user", jsonString, { observe: 'response' }).subscribe((response) => {
  //       console.log(JSON.stringify(response.status));
  //       console.log(JSON.stringify(response.body));
  //       if(response.status === 500){
  //         Swal.fire({
  //           title: 'สมัครสมาชิกไม่สำเร็จ!',
  //           text: 'คุณได้ทำการสมัครสมาชิกสำเร็จ',
  //           icon: 'error',
  //           confirmButtonText: 'ตกลง'
  //         });
  //       } else {
  //         Swal.fire({
  //           title: 'สมัครสมาชิกสำเร็จ!',
  //           text: 'คุณได้ทำการสมัครสมาชิกสำเร็จ',
  //           icon: 'success',
  //           confirmButtonText: 'ตกลง'
  //         });
  //         this.router.navigate(['/login']);
  //       }

  //     });
  //   } else {
  //     Swal.fire({
  //       title: 'สมัครสมาชิกไม่สำเร็จ!',
  //       text: 'กรอกข้อมูลไม่ถูกต้อง หรือ email มีการใช้ไปแล้ว',
  //       icon: 'error',
  //       confirmButtonText: 'ตกลง'
  //     });
  //     console.error('Invalid date format');
  //   }
  // }

  save() {
    if (this.isValidDate(this.bdate)) {
      const userData = {
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        password: this.password,
        tel_number: this.tel_number,
        bdate: this.bdate
      };

      let jsonString = JSON.stringify(userData);
      this.http.post(this.data.apiendpoint + "/user", jsonString, { observe: 'response' }).subscribe((response) => {
        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(response.body));
        console.log(response.status);

        if (response.status === 400) {
          this.showSwal('สมัครสมาชิกไม่สำเร็จ!', 'อีเมลนี้ถูกใช้งานแล้วหรือข้อมูลไม่ถูกต้อง', 'error');
        } else {
          this.showSwal('สมัครสมาชิกสำเร็จ!', 'คุณได้ทำการสมัครสมาชิกสำเร็จ', 'success');
          this.router.navigate(['/login']);
        }
      },(error) => {
        this.showSwal('สมัครสมาชิกไม่สำเร็จ!', 'อีเมลถูกใช้งานแล้ว', 'error');
        console.error('Invalid date format');
      });
    } else {
      this.showSwal('สมัครสมาชิกไม่สำเร็จ!', 'กรอกข้อมูลไม่ถูกต้องหรืออีเมลถูกใช้งานแล้ว', 'error');
      console.error('Invalid date format');
    }


  }


  isValidDate(dateString: string): boolean {
    const regexDate = /^\d{4}-\d{2}-\d{2}$/;
    return regexDate.test(dateString);
  }

  showSwal(title: string, text: string, icon: 'success' | 'error') {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'ตกลง'
    });
  }


  // isValidDate(dateString: string): boolean {
  //   const regexDate = /^\d{4}-\d{2}-\d{2}$/;
  //   return regexDate.test(dateString);
  // }

}


