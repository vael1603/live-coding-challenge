import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  url = 'http://localhost:8080'

  constructor(
    private http: HttpClient
  ) { }

  getSearchText(queryText: string) {
    return this.http.get(`${this.url}/transactions?q=${queryText}`)
  }

  getTransactionByGrossAmount(amount: string){
    return this.http.get(`${this.url}/transactions?grossAmount_gt=${amount}`)
  }

  getTransactionByPayment(payment: string) {
    return this.http.get(`${this.url}/transactions?paymentMethod=${payment}`)
  }

}
