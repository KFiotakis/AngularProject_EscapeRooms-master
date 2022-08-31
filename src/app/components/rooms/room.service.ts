import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from './roomsModels';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private URL = "https://localhost:44368/api/RoomApi";
  private URL1 = "https://localhost:44368/api/RoomApi?roomid=";

  getRooms(): Observable<Room[]> 
  {
    return this.httpService.get<Room[]>(this.URL);
  }

  getRoom(id:string):Observable<Room>
  {
    return this.httpService.get<Room>(this.URL1 + id);
  }

  
  constructor(private httpService:HttpClient) { }
}
