export interface IRoom
{
    title:string;
    photoUtr:string;
    price:number;

    participant: Array<IParticipants>;
}


export interface IParticipants
{
    groupName:string;
    timesParticipated:number;
} 

export enum SortOptions
{
    titleisAsc = "titleisAsc",
    titleisDesc = "titleisDesc",
    groupisAsc = "groupisAsc",
    groupisDesc = "groupisDesc"
}