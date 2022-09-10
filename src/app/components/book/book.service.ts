import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './bookModel';


@Injectable({
  providedIn: 'root'
})
export class BookService {


  private URL = "https://localhost:44368/api/ReservationApi"
  private cardPaymentURL = "https://localhost:44368/api/CardPaymentApi"

  httpOptions = {
     headers: new HttpHeaders({ 'content-Type': 'application/json' })
  }
  

 createBook(book:Book): Observable<Book> {
    
    return this.httpService.post<Book>(this.URL, book, this.httpOptions)
}


payBookWithCard(book:Book): Observable<Book> {
    
  return this.httpService.post<Book>(this.cardPaymentURL, book, this.httpOptions)
}


  constructor(private httpService: HttpClient) { }
}



