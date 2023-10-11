import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };

    let jsonString = JSON.stringify(data);
    console.log(jsonString);

    this.http.post(this.data.apiendpoint + '/login', jsonString).subscribe(
      (response: any) => {
        console.log(response.user.fname);
        console.log(response.user.lname);
        console.log(response.user.ac_id);
        console.log(response.user.role);

        // เพิ่มโค้ดเก็บข้อมูลการเข้าสู่ระบบใน Local Storage
        // localStorage.setItem('isLoggedIn', 'true');
        // localStorage.setItem('userData', JSON.stringify(response.user));
        Swal.fire({
          title: 'เข้าสู่ระบบสำเร็จ!',
          text: 'คุณได้ทำการเข้าสู่ระบบสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง',
        });
        if (response.user.role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/']);
        }

        this.data.setAcId(response.user.ac_id);
        if (response.user.fname) {
          this.data.setUserData(response.user);
        }
      },
      (error) => {
        Swal.fire({
          title: 'เข้าสู่ระบบไม่สำเร็จ!',
          text: 'คุณได้ทำการเข้าสู่ระบบไม่สำเร็จ',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
        console.error('เข้าสู่ระบบไม่สำเร็จ:', error);
      }
    );
  }
}
