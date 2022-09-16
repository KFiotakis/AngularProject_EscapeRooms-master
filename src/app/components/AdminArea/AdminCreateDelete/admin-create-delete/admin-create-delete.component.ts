import { Component, OnInit } from '@angular/core';
import { Room, SortOptions } from 'src/app/components/rooms/roomsModels';
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
  EditVisible: boolean = false;
  CreateHidden: boolean = false;
  searchTitle!: string;
  selectedGenre!: number;
  FilteredRooms!: Array<Room>;
  Genres: any[] = [];
  SortOptions: SortOptions = SortOptions.durationAsc;
  difficultyIsAsc: boolean = true;
  durationIsAsc: boolean = true;

  onEditHandler(myRoom: Room) {
    this.SelectedRoom = myRoom;
    this.EditVisible = !this.EditVisible;
  }

  ToggleCreate() {
    this.CreateHidden = !this.CreateHidden;
  }

  onCloseDetailsWindow(vis: boolean) {
    this.EditVisible = vis;
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
        complete: () => console.log("Created a new Room!")
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

  onFilterRoomHandler() {
    this.FilteredRooms = this.Rooms;
    if (this.searchTitle) {
      this.FilteredRooms = this.FilteredRooms
        .filter(x => x.Title.toUpperCase()
          .includes(this.searchTitle.toUpperCase()))
    }
    if (this.selectedGenre) {
      this.FilteredRooms = this.FilteredRooms
        .filter(x => x.Genre == this.selectedGenre)
    }

    //Sorting
    switch (this.SortOptions) {
      case SortOptions.difficultyAsc: this.FilteredRooms = this.FilteredRooms.sort((a, b) => a.Difficulty < b.Difficulty ? -1 : 1); break;
      case SortOptions.difficultyDesc: this.FilteredRooms = this.FilteredRooms.sort((a, b) => a.Difficulty > b.Difficulty ? -1 : 1); break;
      case SortOptions.durationAsc: this.FilteredRooms = this.FilteredRooms.sort((a, b) => a.Duration - b.Duration); break;
      case SortOptions.durationDesc: this.FilteredRooms = this.FilteredRooms.sort((a, b) => b.Duration - a.Duration); break;
      default: this.FilteredRooms = this.FilteredRooms = this.FilteredRooms.sort((a, b) => a.Title < b.Title ? -1 : 1); break;
    }

  }

  ToggleSortDifficulty() {
    this.difficultyIsAsc = !this.difficultyIsAsc

    if (this.difficultyIsAsc) {
      this.SortOptions = SortOptions.difficultyAsc
    }
    else {
      this.SortOptions = SortOptions.difficultyDesc
    }

    this.onFilterRoomHandler();
  }

  ToggleSortDuration() {
    this.durationIsAsc = !this.durationIsAsc

    if (this.durationIsAsc) {
      this.SortOptions = SortOptions.durationAsc
    }
    else {
      this.SortOptions = SortOptions.durationDesc
    }

    this.onFilterRoomHandler();
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
          this.FilteredRooms = response;
          this.Genres = [...new Set(this.Rooms.map(x => x.Genre))];
          console.log(this.Genres)
        },
        error: e => console.log(e),
        complete: () => console.log("Get Rooms Succesfull!")
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

      case "1":
        return true;
      default:
        return false;
    }
  }




}

