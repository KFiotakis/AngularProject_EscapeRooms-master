import { Component, HostListener, OnInit, Input } from '@angular/core';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { Player } from '../components/sign/signModels';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  Player!:Player;
  dt: any;
  dataDisplay: any;
 

  Admin:boolean = false;
  userLogIn:boolean = false;
  userLogOut: boolean = true;
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
    this.getUserName();
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  getUserName(){
    var player = window.localStorage.getItem("player")
    if (player){
      if (typeof(player) === 'string'){
        this.Player = JSON.parse(player)
        if(this.Player.FirstName == 'Admin'){
          this.Admin = true;
        }
        this.userLogIn = true;
        this.userLogOut = false;
      }
    }
  }


  signOut(){
    window.localStorage.clear()
    this.userLogOut = true;
    this.userLogIn = false;
    this.Admin = false;
  }

}


