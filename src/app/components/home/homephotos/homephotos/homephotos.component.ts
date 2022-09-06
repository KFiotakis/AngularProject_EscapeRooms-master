import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/components/rooms/roomsModels';
import { RoomService } from 'src/app/components/rooms/room.service';

@Component({
  selector: 'app-homephotos',
  templateUrl: './homephotos.component.html',
  styleUrls: ['./homephotos.component.css'],
  
})
export class HomephotosComponent implements OnInit {

  dt: any;
  dataDisplay: any;
  Rooms!: Array<Room>;



 
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};

  
  
 
  constructor (private roomService: RoomService) {}

  ngOnInit(): void { this.roomService.getRooms().subscribe(
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