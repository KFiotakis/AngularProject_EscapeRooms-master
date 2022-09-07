import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RoomsComponent } from './components/rooms/rooms.component';
import { DetailsComponent } from './components/rooms/details/details.component';
import { AboutComponent } from './components/about/about.component';
import { BookComponent } from './components/book/book.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignComponent } from './components/sign/sign.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { HomephotosComponent } from './components/home/homephotos/homephotos/homephotos.component';
import { YoutubeplayerComponent } from './components/home/youtubeplayer/youtubeplayer/youtubeplayer.component';
import { MapComponent } from './components/home/map/map/map.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HeartComponent } from './fa-icons/heart/heart.component';
import { UserSecretComponent } from './fa-icons/user-secret/user-secret.component';
import { BombComponent } from './fa-icons/bomb/bomb.component';
import { HashtagComponent } from './fa-icons/hashtag/hashtag.component';
import { UsersComponent } from './fa-icons/users/users.component';
import { HourglassEndComponent } from './fa-icons/hourglass-end/hourglass-end.component';  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomsComponent,
    DetailsComponent,
    AboutComponent,
    BookComponent,
    ContactComponent,
    SignComponent,
    HomephotosComponent,
    YoutubeplayerComponent,
    MapComponent,
    HomephotosComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent,
    NavBarComponent,
    FooterComponent,
    HeartComponent,
    UserSecretComponent,
    BombComponent,
    HashtagComponent,
    UsersComponent,
    HourglassEndComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    YouTubePlayerModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot
      ([

        { path: "Home", component: HomeComponent },
        { path: "Rooms", component: RoomsComponent },
        { path: "Rooms/:roomId", component: DetailsComponent },
        { path: "About", component: AboutComponent },
        { path: "Book/:roomId", component: BookComponent },
        { path: "Contact", component: ContactComponent },
        { path: "Sign", component: SignComponent },

        { path: '', redirectTo: "/Home", pathMatch: 'full' },
        { path: '**', component: PageNotFoundComponent }

      ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
