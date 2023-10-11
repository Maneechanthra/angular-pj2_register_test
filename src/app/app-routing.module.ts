import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { BuyTricketComponent } from './page/buy-tricket/buy-tricket.component';
import { OrderHistoryComponent } from './page/order-history/order-history.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ReportUserComponent } from './page/report-user/report-user.component';
import { ReportTicketComponent } from './page/report-ticket/report-ticket.component';
import { ReportBuyticketComponent } from './page/report-buyticket/report-buyticket.component';
import { ReportDetailComponent } from './page/report-detail/report-detail.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'buy_tricket',component: BuyTricketComponent},
  {path: 'order_history', component: OrderHistoryComponent},
  {path: 'order_list', component: OrderListComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'report_user', component: ReportUserComponent},
  {path: 'report_ticket', component: ReportTicketComponent},
  {path: 'report_buyticket', component: ReportBuyticketComponent},
  {path: 'report_detail', component: ReportDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
