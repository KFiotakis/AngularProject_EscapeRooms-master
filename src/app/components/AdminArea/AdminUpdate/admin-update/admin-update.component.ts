import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Room } from 'src/app/components/rooms/roomsModels';
import { RoomService } from 'src/app/components/rooms/room.service';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent {

  @Input() Room!: Room;

  @Output() myEvent = new EventEmitter<string>();

  @Output() isClosedEvent = new EventEmitter<boolean>();


  @Input() isVisible: boolean = true;
  onCloseHandler() {
    this.isVisible = false;
    this.myEvent.emit("Close pushed")
    this.isClosedEvent.emit(false);
  }


  Rooms!: Array<Room>;
  constructor(private roomService: RoomService) { }

  UpdateRoomHandler(id:number, title: string, description: string,
    duration: number, genre: string, capacity: number,
    difficulty: string, hasActor: boolean, rating: number, escapeRate: number, isActive: boolean,
    startingPricePerPerson: number,
    discountPerPerson: number, imageUrl: string, videoId: string): void {
    this.roomService.updateRoom({Id: id,
      Title: title,
      Description: description, Duration: duration
      , Genre: Number(genre), Capacity: capacity, Difficulty: Number(difficulty), HasActor: hasActor, Rating: rating, EscapeRate: escapeRate, IsActive: isActive,
      StartingPricePerPerson: startingPricePerPerson,
      DiscountPerPerson: discountPerPerson, ImageUrl: imageUrl, VideoId: videoId
    } as Room).subscribe(
      {
        next: response => console.log(response),
        error: e => console.log("Can not update"),
        complete: () => console.log(this.Room)
      }
    );
    window.location.reload();
  }

  getBoolean(value: string) {

    switch (value) {

      case "true":
        return true;
      default:
        return false;
    }
  }

  ngOnInit(): void {

  }

}




