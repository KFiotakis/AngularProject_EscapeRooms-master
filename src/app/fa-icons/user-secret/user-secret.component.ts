import { Component, OnInit } from '@angular/core';
import data from "src/app/components/Json/data.json";
import { RoomService } from 'src/app/components/rooms/room.service'; 
import { Room } from 'src/app/components/rooms/roomsModels';

@Component({
  selector: 'app-user-secret',
  templateUrl: './user-secret.component.html',
  styleUrls: ['./user-secret.component.css']
})
export class UserSecretComponent implements OnInit {

  dt: any;
  dataDisplay: any;
  //Rooms!:Array<Room>;
  Rooms : any = data;
  constructor(private roomService:RoomService) { }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(
      /*{
        next: response => {
          if (response) {
            hideloader();
        }
          this.Rooms = response;
          this.dt = response;
          this.dataDisplay = this.dt.data;},
        error: e => console.log(e),
        complete: () => console.log()
      }*/
    );

    // Function is defined
   /* function hideloader() {
  
      // Setting display of spinner
      // element to none
      let ele = document.getElementById('loading');
      if (ele){
        ele.style.display = 'none';
      }
      
  }

    
  }

}*/
  }
}
