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
import { HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HeartComponent } from './fa-icons/heart/heart.component';
import { UserSecretComponent } from './fa-icons/user-secret/user-secret.component';
import { BombComponent } from './fa-icons/bomb/bomb.component';
import { HashtagComponent } from './fa-icons/hashtag/hashtag.component';
import { UsersComponent } from './fa-icons/users/users.component';
import { HourglassEndComponent } from './fa-icons/hourglass-end/hourglass-end.component';
import { MatInputModule } from "@angular/material/input";
import { ChartComponent } from './components/chart/chart.component';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { AdminCreateDeleteComponent } from './components/AdminArea/AdminCreateDelete/admin-create-delete/admin-create-delete.component';
import { AdminUpdateComponent } from './components/AdminArea/AdminUpdate/admin-update/admin-update.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { UserProfileComponent } from './Authentication/userprofile/userprofile.component';

import { AuthInterceptor } from './Authentication/userprofile/auth.interceptor';
import { LockedInComponent } from './components/home/locked-in/locked-in.component';
import { AvatarsComponent } from './components/about/avatars/avatars.component';
import { ChatComponent } from './chat/chat.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;





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
    CanvasJSChart,
    ChartComponent,
    AdminCreateDeleteComponent,
    AdminUpdateComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    LockedInComponent,
    AvatarsComponent,
    ChatComponent
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    YouTubePlayerModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forRoot
      ([

        { path: "Home", component: HomeComponent },
        { path: "Rooms", component: RoomsComponent },
        { path: "Rooms/:roomId", component: DetailsComponent },
        { path: "About", component: AboutComponent },
        { path: "Book/:roomId", component: BookComponent },
        { path: "Contact", component: ContactComponent },
        { path: "Sign", component: SignComponent },
        {path:"Admin", component:AdminCreateDeleteComponent},

        { path: '', redirectTo: "/Home", pathMatch: 'full' },
        { path: '**', component: PageNotFoundComponent }

      ], {
        anchorScrolling: 'enabled',
        relativeLinkResolution: 'corrected',
        initialNavigation: 'enabledBlocking',
        scrollPositionRestoration: 'enabled'
    })

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
