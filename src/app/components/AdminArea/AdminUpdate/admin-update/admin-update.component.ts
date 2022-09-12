import { Component,Input, OnInit } from '@angular/core';
import { Room } from 'src/app/components/rooms/roomsModels';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent {

  @Input() Room!:Room;

  isVisible:boolean= true;
  onCloseHandler() 
  {
    this.isVisible =!this.isVisible;
  }



  constructor() { }

}
