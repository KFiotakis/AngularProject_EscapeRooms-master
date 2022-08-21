import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 
import { DetailsComponent } from './components/rooms/details/details.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AboutComponent } from './components/about/about.component';
import { BookComponent } from './components/book/book.component';
import { ContactComponent } from './components/contact/contact.component'; 
import { SignComponent } from './components/sign/sign.component';  

const routes: Routes = [
  {path:'',redirectTo:'Home', pathMatch: 'full' },
  {path:"Home", component:HomeComponent},
  {path:"Rooms", component:RoomsComponent},
  {path:"Details", component:DetailsComponent},
  {path:"About", component:AboutComponent},
  {path:"Book", component:BookComponent},
  {path:"Contact", component:ContactComponent},
  {path:"Sign", component:SignComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] }
)

export class AppRoutingModule {}
