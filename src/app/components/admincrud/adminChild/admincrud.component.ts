import { Component, Input} from '@angular/core';
import { Room } from '../../rooms/roomsModels';

@Component({
  selector: 'app-admincrud',
  templateUrl: './admincrud.component.html',
  styleUrls: ['./admincrud.component.css']
})
export class AdmincrudComponent {

  @Input() Room!:Room;

  isVisible:boolean= true;
  onCloseHandler() 
  {
    this.isVisible =!this.isVisible;
  }



  constructor() { }

 


}
