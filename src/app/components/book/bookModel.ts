import { Time } from "@angular/common";

export interface Book
{
    Id:number,
    RoomId:number,
    FirstName:string,
    LastName:string,
    NumberofPlayers:number,
    GameDate:Date,
    GameHour:string,
    TotalPrice:number,
    IsPayed:boolean,
    Email:string,
    PhoneNumber:number,
    IsSubscribed:boolean
}
