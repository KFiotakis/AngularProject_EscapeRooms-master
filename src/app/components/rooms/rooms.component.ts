import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { Room } from './roomsModels';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  dt: any;
  dataDisplay: any;
  Rooms!:Array<Room>;
  
  constructor(private roomService:RoomService) { }

  ngOnInit(): void {
   this.roomService.getRooms().subscribe(
      {
        next: response => {
          if (response) {
            hideloader();
        }
          this.Rooms = response;
          this.dt = response;
          this.dataDisplay = this.dt.data;},
        error: e => console.log(e),
        complete: () => console.log()
      }
    );

    // Function is defined
    function hideloader() {
  
      // Setting display of spinner
      // element to none
      let ele = document.getElementById('loading');
      if (ele){
        ele.style.display = 'none';
      }
      
  }

    
  }

}
