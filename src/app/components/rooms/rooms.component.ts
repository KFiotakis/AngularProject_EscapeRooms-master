import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { Room } from './roomsModels';
import { IWithActorSettings, WithActorSettings } from './roomSettings';
import { ICardSettings, CardSettings } from './roomSettings';
import { ICardImgBodySettings, CardImgBodySettings } from './roomSettings';


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

  constructor(private roomService: RoomService) { }

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


