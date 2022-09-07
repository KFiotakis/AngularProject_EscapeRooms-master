import { Time } from "@angular/common";

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
    IsSubscribed:boolean
}
