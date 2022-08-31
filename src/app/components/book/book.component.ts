import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import data from "src/app/components/Json/data.json";
import { RoomService } from '../rooms/room.service';
import { Room } from '../rooms/roomsModels';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  Rooms : any = data;
  alert:boolean=false;

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

  submitdone()
  {
    this.alert = !this.alert;
  this.alert=true;
  }
  
 
}
