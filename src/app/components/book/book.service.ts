import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './bookModel';


@Injectable({
  providedIn: 'root'
})
export class BookService {


  private URL = "https://localhost:44368/api/ReservationApi"
  private URLpay = "https://localhost:44368/PayPalApi/CreatePayment"

  httpOptions = {
     headers: new HttpHeaders({ 'content-Type': 'application/json' })
  }
  

 createBook(book:Book): Observable<Book> {
    
    return this.httpService.post<Book>(this.URL, book, this.httpOptions)
}


payBook(book:Book): Observable<Book> {
    
  return this.httpService.post<Book>(this.URLpay, book, this.httpOptions)
}


  constructor(private httpService: HttpClient) { }
}






//   deleteCar(id: number) {
//     const url = `${this.URL}/${id}`;    //https://localhost:44372/api/Car/5
//     return this.httpService.delete<Car>(url, this.httpOptions);
//   }

//   getCars(): Observable<Car[]> {
//     return this.httpService.get<Car[]>(this.URL);
//   }

//   updateCar(car:Car){
//     const url = `${this.URL}/${car.Id}`; 
//     return this.httpService.put<Car>(this.URL, car, this.httpOptions);
//   }


