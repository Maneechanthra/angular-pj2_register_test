import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiendpoint = 'http://localhost/api';

  // totalQuantity:any;

  totalQuantity: any = 0;
  selectedLotCount: number = 0;

  constructor(private http: HttpClient) {}

  selectlot(lot_id: number) {
    return this.http.get(`${this.apiendpoint}/lottory/${lot_id}`);
  }

  public addCart(lot_id: number) {
    return this.http.get(`${this.apiendpoint}/lottory/${lot_id}`);
  }

  public selectedLotIdsSubject = new BehaviorSubject<
    { lot_id: string; quantity: number; price: number; ticket_id: any }[]
  >([]);
  selectedLotIds$ = this.selectedLotIdsSubject.asObservable();

  addSelectedLotId(
    lot_id: string,
    quantity: number,
    price: number,
    ticket_id: any
  ) {
    const currentSelectedLotIds = this.selectedLotIdsSubject.value;
    const updatedSelectedLotIds = [
      ...currentSelectedLotIds,
      { lot_id, quantity, price, ticket_id },
    ];
    this.selectedLotIdsSubject.next(updatedSelectedLotIds);
  }

  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  setUserData(userData: any) {
    this.userDataSubject.next(userData);
  }

  private acId: number | null = null;
  setAcId(acId: number) {
    this.acId = acId;
  }

  getAcId() {
    return this.acId;
  }

  addToTotal(quantity: number) {
    this.totalQuantity += quantity;
  }
  updateSelectedLotCount() {
    this.selectedLotCount += 1;
  }
}
