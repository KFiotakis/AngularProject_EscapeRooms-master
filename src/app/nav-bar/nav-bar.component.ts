import { Component, HostListener, OnInit } from '@angular/core';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {



  isOpen: boolean = false;
  isScrolled: boolean = false;

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  @HostListener("window:scroll")
  scrollEvent() {
    window.pageYOffset >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
  }
  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollEvent, true);
  }
}


