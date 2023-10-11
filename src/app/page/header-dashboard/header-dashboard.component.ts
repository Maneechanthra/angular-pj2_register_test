import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboardComponent implements OnInit{

  userData: any;
  constructor(private dataServive: DataService,private router: Router){

  }
  ngOnInit() {
    this.dataServive.userData$.subscribe(userData => {
      this.userData = userData;
    });
  }

  logout() {
    // Call your data service's logout method to handle clearing any user-specific data.
    // Remove the authentication token from localStorage.
    localStorage.removeItem('authToken');

    // Redirect the user to the login page.
    this.router.navigate(['/login']);
  }
}
