import { Component, OnInit } from '@angular/core';
import data from "src/app/components/Json/data.json";
import { ActivatedRoute } from '@angular/router';
import { Room} from '../roomsModels';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  Rooms : any = data;
  constructor(private route: ActivatedRoute) { }

 room: Room | undefined;
 
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const roomIdFromRoute = Number(routeParams.get('roomId'));

    this.room = data.find(room =>room.Id == roomIdFromRoute);

      
    }
  }


