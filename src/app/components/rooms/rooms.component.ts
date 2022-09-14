import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { Room ,SortOptions} from './roomsModels';
import { IWithActorSettings, WithActorSettings } from './roomSettings';
import { ICardSettings, CardSettings } from './roomSettings';
import { ICardImgBodySettings, CardImgBodySettings } from './roomSettings';
import { NumberValueAccessor } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

 
  dt: any;
  dataDisplay: any;
  Rooms!: Array<Room>;

  AcSettings: IWithActorSettings = WithActorSettings;
  CSettings: ICardSettings = CardSettings;
  CImgSettings: ICardImgBodySettings = CardImgBodySettings;


  //Filtering
  searchTitle!: string;
  selectedGenre!: number;
  FilteredRooms!: Array<Room>;
  Genres: any[] = [];

  SortOptions:SortOptions=SortOptions.durationAsc;


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
    switch(this.SortOptions){
      case SortOptions.difficultyAsc: this.FilteredRooms = this.FilteredRooms.sort((a,b)=> a.Difficulty < b.Difficulty?-1:1); break;
      case SortOptions.difficultyDesc:  this.FilteredRooms= this.FilteredRooms.sort((a,b)=> a.Difficulty > b.Difficulty?-1:1);break;
      case SortOptions.durationAsc: this.FilteredRooms= this.FilteredRooms.sort((a,b)=>a.Duration - b.Duration);break;
      case SortOptions.durationDesc: this.FilteredRooms= this.FilteredRooms.sort((a,b)=>b.Duration - a.Duration);break;
      default: this.FilteredRooms = this.FilteredRooms= this.FilteredRooms.sort((a,b)=>a.Title < b.Title?-1:1); break;

    }




  }


  difficultyIsAsc:boolean =true;

  ToggleSortDifficulty(){
    this.difficultyIsAsc = !this.difficultyIsAsc

    if(this.difficultyIsAsc){
      this.SortOptions = SortOptions.difficultyAsc
    }
    else{
      this.SortOptions = SortOptions.difficultyDesc
    }

    this.onFilterRoomHandler();
  }


  durationIsAsc:boolean =true;

  ToggleSortDuration(){
    this.durationIsAsc = !this.durationIsAsc

    if(this.durationIsAsc){
      this.SortOptions = SortOptions.durationAsc
    }
    else{
      this.SortOptions = SortOptions.durationDesc
    }

    this.onFilterRoomHandler();
  }
 


  constructor(private roomService: RoomService) { 
    
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
          this.FilteredRooms=response;
          this.Genres = [...new Set(this.Rooms.map(x => x.Genre))];
          console.log(this.Genres)
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


    howManyBombs(room: Room): Array<number>{
      var arr!:number[];
      switch(String(room.Difficulty)){
        case "Beginner": arr = new Array<number>(1); break;
        case "Intermediate" : arr = new Array<number>(2); break;
        case "Advanced": arr = new Array<number>(3); break;
      }
      return arr;
    }
  }



 




