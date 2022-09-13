import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/components/rooms/roomsModels';
import { RoomService } from 'src/app/components/rooms/room.service';

@Component({
  selector: 'app-admin-create-delete',
  templateUrl: './admin-create-delete.component.html',
  styleUrls: ['./admin-create-delete.component.css']
})
export class AdminCreateDeleteComponent implements OnInit {

  dt: any;
  dataDisplay: any;
  Rooms!: Array<Room>;
  room: Room | undefined;
  SelectedRoom!: Room;
  onEditHandler(myRoom: Room) {
    this.SelectedRoom = myRoom;
    console.log(this.SelectedRoom);
  }

  constructor(private roomService: RoomService) { }

  CreateRoomHandler(title: string, description: string,
    duration: number, genre: string, capacity: number,
    difficulty: string, hasActor: boolean, rating: number, escapeRate: number, isActive: boolean,
    startingPricePerPerson: number,
    discountPerPerson: number, imageUrl: string, videoId: string): void {
    this.roomService.createRoom({
      Title: title,
      Description: description, Duration: duration
      , Genre: Number(genre), Capacity: capacity, Difficulty: Number(difficulty), HasActor: hasActor, Rating: rating, EscapeRate: escapeRate, IsActive: isActive,
      StartingPricePerPerson: startingPricePerPerson,
      DiscountPerPerson: discountPerPerson, ImageUrl: imageUrl, VideoId: videoId
    } as Room).subscribe(
      {
        next: response => console.log(response),
        error: err => console.log(err),
        complete: () => console.log("Created a new Room!"+this.room)
      }
    );
    window.location.reload();
  }


  DeleteRoomHandler(id: number) {
    this.roomService.deleteRoom(id).subscribe(
      {
        next: response => console.log(response),
        error: err => console.log(err),
        complete: () => console.log("Room Deleted!")
      }
    )
    window.location.reload();
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

  getBoolean(value: string) {

    switch (value) {

      case "true":
        return true;
      default:
        return false;
    }
  }




}

