import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './bookModel';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private URL = "https://localhost:44368/api/BookingApi"
  private cardPaymentURL = "https://localhost:44368/api/CardPayment/Post"

  httpOptions = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' })
  }


  getAvailableDates(id: string): Observable<Book[]> {
    return this.httpService.get<Book[]>(this.URL + '/GetBookingsByRoomId?roomId=' + id);
  }

  getBooks(): Observable<Book[]> {
    return this.httpService.get<Book[]>(this.URL + '/GetAllBookings');
  }

  createBook(book: Book): Observable<Book> {
    return this.httpService.post<Book>(this.URL + '/StoreBooking', book, this.httpOptions)
  }


  payBookWithCard(book: Book): Observable<Book> {

    return this.httpService.post<Book>(this.cardPaymentURL, book, this.httpOptions)
  }


  constructor(private httpService: HttpClient) { }
}



