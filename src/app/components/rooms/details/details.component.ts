import { Component, OnInit } from '@angular/core';
import data from "src/app/components/Json/data.json";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  Rooms : any = data;
  constructor() { }

  ngOnInit(): void {
  }

}
