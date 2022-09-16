import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.signIn();
    this.signUp();
  }

  signUp() {
    let element = document.getElementById("container_SignIn");
    if (element)
    element.classList.add("myStyle");
}

  signIn() {
    let element = document.getElementById("container_SignIn");
    if (element)
    element.classList.remove("myStyle");
}

}
