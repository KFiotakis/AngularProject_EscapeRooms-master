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
  
 paymentMethod!:string;

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


getTimeArray(duration: number) : Array<Date>{
  let startDate: Date = new Date(2022,9,5,18,0,0);
  let endDate: Date = new Date(2022,9,5,23,0,0);

  var arr: Date[] = [];
  var dt: Date = new Date(startDate);
  while(dt <= endDate){
    arr.push(new Date(dt));
    dt.setMinutes(dt.getMinutes() + duration + 10);
  }
  return arr;
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


  ConvertStringForGameHour(dateString: string) : Date{
    const date = 'Wed Sep 07 2022 00:00:00 GMT+0000 (Atlantic Standard Time)';

    const t1: any = dateString.split(' ');
    const t2: any = t1[0].split(':');
    t2[0] = (t1[1] === 'PM' ? (1*t2[0] + 12) : t2[0]);
    const time24 = (t2[0] < 10 ? '0' + t2[0] : t2[0]) + ':' + t2[1] + ':00';
    var completeDate = date.replace("00:00:00", time24.toString());
    let newDate = new Date(completeDate);

    return newDate;
  }
  
  
  CreateBookHandler(roomId:number, firstName:string, lastName:string,  gameDate:Date, numberOfPlayers:string, gameTime:string){

    console.log(roomId, firstName, lastName, gameDate,  numberOfPlayers, gameTime);

    var kati = numberOfPlayers.substring(0,1);
    console.log(kati);
    var newDate = this.ConvertStringForGameHour(gameTime);
    console.log(newDate);
    console.log(this.paymentMethod)

    
      // this.bookService.createBook({RoomId:roomId, FirstName:firstName, LastName:lastName, GameDate:gameDate, NumberOfPlayers:+kati,GameTime:newDate} as Book).subscribe(
      //   {
  
      //     next: response => console.log(response),
  
      //     error : error => console.log(error),
  
      //     complete: () => console.log("Petuxe")
  
      //   }
  
      // )
    
    // else{
      this.bookService.payBook({RoomId:roomId, FirstName:firstName, LastName:lastName, GameDate:gameDate, NumberOfPlayers:+kati,GameTime:newDate} as Book).subscribe(
        {
  
          next: response => console.log(response),
  
          error : error => console.log(error),
  
          complete: () => console.log("Ksanapetuxe")
  
        }
      )
    // }
   

  }

 

}
