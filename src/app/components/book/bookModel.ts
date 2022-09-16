import { Time } from "@angular/common";
import { Room } from "../rooms/roomsModels";

export interface Book
{
    Id:number,
    RoomId:number,
    FirstName:string,
    LastName:string,
    NumberOfPlayers:number,
    GameDate:Date,
    GameTime:Date,
    TotalPrice:number,
    IsPayed:boolean,
    Email:string,
    PhoneNumber:number,
    IsSubscribed:boolean,
    Room:Room
}


export class TimeSelectObject
{
   Time!:Date
   IsDisabled!:boolean
   Color!:string
}