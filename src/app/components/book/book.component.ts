import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import data from "src/app/components/Json/data.json";
import { RoomService } from '../rooms/room.service';
import { Room } from '../rooms/roomsModels';
import { Book } from './bookModel';
import { BookService } from './book.service';

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
  book!: Book;


  timeArray:any=[
    {value:"18:00",text:"18:00"},
    {value:"20:00",text:"20:00"},
    {value:"22:00",text:"22:00"},
    {value:"12:00",text:"12:00"}
    
 ]

  id = this.actRoute.snapshot.params['roomId'];

  constructor(private actRoute: ActivatedRoute, private roomService: RoomService, private bookService: BookService) { 
    
  }

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

  getNumberOfPlayers(length: number): Array<number> {
    var arr: number[] = [];
    for (let i = 2 ; i <= length; i++){
      arr.push(i);
    }
    return arr;
  }

  showTotalPrice(players : number): number{
    
    if (this.room){
      var price = (players > 2 ? (this.room.StartingPricePerPerson * players) - (this.room.StartingPricePerPerson * players * this.room.DiscountPerPerson)
                  : this.room.StartingPricePerPerson * players)
      return Math.floor(price);
    }
    else {
      return 0;
    }
  }

  submitdone()
  {
    this.alert = !this.alert;
  this.alert=true;
  }
  
  
  // CreateBookHandler(roomId:number, firstName:string, lastName:string, numberofPlayers:string,  gameDate:Date, gameHour:string,){

  //   if (this.room)
  //   console.log(roomId, firstName, numberofPlayers, gameDate, gameHour);

  //   this.bookService.createBook({RoomId: roomId, FirstName:firstName, LastName:lastName, NumberofPlayers:numberofPlayers, GameDate:gameDate, GameHour:gameHour} as Book).subscribe(
  //     {

  //       next: response => console.log(response),

  //       error : error => console.log(error),

  //       complete: () => console.log("Petuxe")

  //     }

  //   )

  // }
  CreateBookHandler(roomId:number, firstName:string,lastName:string,gameDate:Date,gameHour:string,numberofPlayers:string){

    if (this.room)
    console.log(roomId, firstName,lastName,gameDate,numberofPlayers,gameHour);

    var kati = numberofPlayers.substring(0,1);
    console.log(kati);

    this.bookService.createBook({RoomId: roomId, FirstName:firstName,LastName:lastName,GameDate:gameDate,NumberofPlayers:+kati,GameHour:gameHour} as Book).subscribe(
      {

        next: response => console.log(response),

        error : error => console.log(error),

        complete: () => console.log("Petuxe")

      }

    )

  }





}
