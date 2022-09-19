import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from './contactModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private URL = "https://localhost:44368/api/admin/emailfromcontact";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  createContact(contact: Contact): Observable<Contact> {
    console.log(contact);
    return this.httpService.post<Contact>(this.URL, contact, this.httpOptions);
  }

  constructor(private httpService: HttpClient) { }
}
