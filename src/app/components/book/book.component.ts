import { Component, OnInit } from '@angular/core';
import data from "src/app/components/Json/data.json";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  Rooms : any = data;
  constructor() { }

  ngOnInit(): void {
  }

}
