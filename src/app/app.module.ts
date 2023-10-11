import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './page/main/main.component';
import { HeaderComponent } from './page/header/header.component';
import { FooterComponent } from './page/footer/footer.component';
import { RegisterComponent } from './page/register/register.component';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BuyTricketComponent } from './page/buy-tricket/buy-tricket.component';
import { OrderHistoryComponent } from './page/order-history/order-history.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { AddtricketComponent } from './page/addtricket/addtricket.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { HeaderDashboardComponent } from './page/header-dashboard/header-dashboard.component';
import { ReportUserComponent } from './page/report-user/report-user.component';
import { ReportTicketComponent } from './page/report-ticket/report-ticket.component';
import { ReportBuyticketComponent } from './page/report-buyticket/report-buyticket.component';
import { AddDashticketComponent } from './page/add-dashticket/add-dashticket.component';
import { EditTicketComponent } from './page/edit-ticket/edit-ticket.component';
import { ReportDetailComponent } from './page/report-detail/report-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DataService } from './service/data.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    BuyTricketComponent,
    OrderHistoryComponent,
    AddtricketComponent,
    OrderListComponent,
    DashboardComponent,
    HeaderDashboardComponent,
    ReportUserComponent,
    ReportTicketComponent,
    ReportBuyticketComponent,
    AddDashticketComponent,
    EditTicketComponent,
    ReportDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    MatTabsModule,
    MatToolbarModule,
    DividerModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    CommonModule,
    PaginationModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
