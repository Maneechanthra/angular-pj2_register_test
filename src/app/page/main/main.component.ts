import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Account } from 'src/app/model/account.model';
import { Convert as LottoryCvt, Lottory } from 'src/app/model/lottery_ticket.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  // Account = Array<Account>();
  lottory = Array<Lottory>();
  // selectedLandmark : any;

  constructor(private dataService : DataService, private http : HttpClient){
    http.get(dataService.apiendpoint + "/lottory").subscribe((data : any) => {
      this.lottory = LottoryCvt.toLottory(JSON.stringify(data));
      console.log(this.lottory);
    });

   }
}
