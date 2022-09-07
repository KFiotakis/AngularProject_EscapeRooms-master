import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactMethods =[
    {id:1,name:'Email'},
    {id:2,name:'SMS'},
    {id:3,name:'Facebook'},
    {id:4,name:'Viber'}
  ];

  log(x:any) {console.log(x);}

  submit(f:any) {console.log(f)}
  

  constructor() { }

  ngOnInit(): void {
    
  }

  
}
