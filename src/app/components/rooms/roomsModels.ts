export interface Room
{
    Id:number,
    Title:string,
    Description:string,
    Duration:number,
    Genre:number,
    Capacity:number,
    Difficulty:number,
    HasActor:boolean,
    Rating:number,
    EscapeRate:number,
    IsActive:boolean,
    StartingPricePerPerson:number,
    DiscountPerPerson:number,
    ImageUrl:string,
    VideoId:string
}

export enum SortOptions{
    difficultyAsc="difficultyAsc",
    difficultyDesc="difficultyDesc",
    durationAsc="durationAsc",
    durationDesc="durationDesc"
}
