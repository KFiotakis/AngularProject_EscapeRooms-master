import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from './roomsModels';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private URL = "https://localhost:44368/api/RoomApi";
  private URL1 = "https://localhost:44368/api/RoomApi?roomid=";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getRooms(): Observable<Room[]> {
    return this.httpService.get<Room[]>(this.URL);
  }

  getRoom(id: string): Observable<Room> {
    return this.httpService.get<Room>(this.URL1 + id);
  }

  createRoom(room: Room): Observable<Room> {
    console.log(room);
    return this.httpService.post<Room>(this.URL, room, this.httpOptions);
  }

  deleteRoom(id: number) {
    return this.httpService.delete<Room>(this.URL1 + id, this.httpOptions);
  }

  constructor(private httpService: HttpClient) { }
}
