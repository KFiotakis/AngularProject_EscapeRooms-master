import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../roomsModels';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  // Rooms : any = data;
  dt: any;
  dataDisplay: any;
  room: Room | undefined;

  id = this.actRoute.snapshot.params['roomId'];

  constructor(private actRoute: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomService.getRoom(this.id).subscribe(
      {
        next: response => {
          this.room = response;
          this.dt = response;
          this.dataDisplay = this.dt.data;
        },
        error: e => console.log(e),
        complete: () => console.log(this.room)
      }
    );
  }

  howManyBombs(room: Room): Array<number>{
    var arr!:number[];
    switch(String(room.Difficulty)){
      case "Easy": arr = new Array<number>(1); break;
      case "Hard" : arr = new Array<number>(2); break;
      case "Nightmare": arr = new Array<number>(3); break;
    }
    return arr;
  }

}




