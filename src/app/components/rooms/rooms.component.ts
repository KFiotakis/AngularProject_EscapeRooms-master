import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import sampledata from './Json/data.json';

 
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {


  Rooms: any = sampledata;
  constructor() { }

  ngOnInit(): void {
  }

}
