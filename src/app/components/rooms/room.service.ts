import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from './roomsModels';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private URL = "https://localhost:44368/api/RoomApi";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getRooms(): Observable<Room[]> {
    return this.httpService.get<Room[]>(this.URL+"/GetRooms");
  }

  getRoom(id: string): Observable<Room> {
    return this.httpService.get<Room>(this.URL+"/GetRoom?roomid=" + id);
  }

  createRoom(room: Room): Observable<Room> {
    console.log(room);
    return this.httpService.post<Room>(this.URL+"/CreateRoom", room, this.httpOptions);
  }

  updateRoom(room:Room): Observable<Room>
  {
    console.log(room);
    return this.httpService.put<Room>(this.URL+"/UpdateRoom", room, this.httpOptions);
  }

  deleteRoom(id: number) {
    return this.httpService.delete<Room>(this.URL+"/DeleteRoom?roomid="+ id, this.httpOptions);
  }

  
  constructor(private httpService: HttpClient) { }
}
