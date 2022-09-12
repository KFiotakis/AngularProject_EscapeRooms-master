import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { Room, Genre } from './roomsModels';
import { IWithActorSettings, WithActorSettings } from './roomSettings';
import { ICardSettings, CardSettings } from './roomSettings';
import { ICardImgBodySettings, CardImgBodySettings } from './roomSettings';
import { NumberValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  //Filtering
  searchTitle!: string;
  searchGenre!: number | string;
  selectedGenre!: string;
  FilteredRooms!: Array<Room>;
  Genres: any[] = [];

  FilterRooms() {
    this.FilteredRooms = this.Rooms;
    if (this.searchTitle) {
      this.FilteredRooms = this.FilteredRooms
        .filter(x => x.Title.toUpperCase()
          .includes(this.searchTitle.toUpperCase()))
    }

    this.GetGenresOption();
    if (this.searchGenre) {
      this.FilteredRooms = this.FilteredRooms
        .filter(x => x.Genre == this.searchGenre)

    }
  }

  GetGenresOption() {
     this.searchGenre = this.selectedGenre;
  }


  Method(){
    for (const key in Genre) {
      if(!isNaN(parseInt(key))){
       let temp = {
         title:Genre[key],
         no:key
        }
        this.Genres.push(temp)
      }
  }
}

  rooms: any;
  dt: any;
  dataDisplay: any;
  Rooms!: Array<Room>;
  AcSettings: IWithActorSettings = WithActorSettings;
  CSettings: ICardSettings = CardSettings;
  CImgSettings: ICardImgBodySettings = CardImgBodySettings;

  constructor(private roomService: RoomService) {
      this.Method();
     
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


