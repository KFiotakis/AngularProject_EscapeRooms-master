import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isScrolled = false;

  @HostListener("window:scroll")
  scrollEvent() {
    window.pageYOffset >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
  }
  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollEvent, true);
  }
}


