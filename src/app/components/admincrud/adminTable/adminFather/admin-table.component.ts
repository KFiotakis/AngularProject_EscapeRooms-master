import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/components/rooms/roomsModels';
import { RoomService } from 'src/app/components/rooms/room.service';



@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {

  dt: any;
  dataDisplay: any;
  Rooms!: Array<Room>;
  room: Room | undefined;

  SelectedRoom!:Room;
  onEditHandler(myRoom:Room)
  {
    this.SelectedRoom = myRoom;
    console.log(this.SelectedRoom);
  }
  
  constructor(private roomService:RoomService) { }

  CreateRoomHandler(title:string,description:string,
     duration:number,genre:number,capacity:number, 
     difficulty:number,
     startingPricePerPerson:number,
     discountPerPerson:number,imageUrl:string,videoId:string):void
     {
        this.roomService.createRoom({Title:title,
          Description:description,Duration:duration
          ,Genre:genre,Capacity:capacity,Difficulty:difficulty,
          StartingPricePerPerson:startingPricePerPerson,
          DiscountPerPerson:discountPerPerson,ImageUrl:imageUrl,VideoId:videoId}as Room).subscribe(
          {
            next: response => console.log(response),
            error: err => console.log(err),
            complete: () => console.log(this.room)
          }
        );
     }



  ngOnInit(): void {
    this.roomService.getRooms().subscribe(
      {
        next: response => {
          if (response) {
            hideloader();
          }
          this.Rooms = response;
          this.dt = response;
          this.dataDisplay = this.dt.data;
        },
        error: e => console.log(e),
        complete: () => console.log(this.Rooms)
      }
    );
    // Function is defined
    function hideloader() {

      // Setting display of spinner
      // element to none
      let ele = document.getElementById('loading');
      if (ele) {
        ele.style.display = 'none';
      }
    }

  
  }


}
