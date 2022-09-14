import { Component } from '@angular/core';
import { AuthService } from './Authentication/userprofile/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-project';
  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout()
  }
}
