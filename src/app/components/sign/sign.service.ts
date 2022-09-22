import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from './signModels';

@Injectable({
    providedIn: 'root'
  })
  export class SignService {
  
    private URL = "https://localhost:44368/api/PlayerApi"
    
    httpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' })
    }


    createPlayer(player: Player): Observable<Player> {
        return this.httpService.post<Player>(this.URL + '/Create', player, this.httpOptions)
      }

      getPlayers(): Observable<Player[]> {
        return this.httpService.get<Player[]>(this.URL+"/GetPlayers");
      }

    constructor(private httpService: HttpClient) { }
}