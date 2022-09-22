import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../rooms/room.service';
import { Room } from '../rooms/roomsModels';
import { Book, TimeSelectObject } from './bookModel';
import { BookService } from './book.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Player } from '../sign/signModels';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})


export class BookComponent implements OnInit {


  form: FormGroup;
  first_name: FormControl = new FormControl({value:this.fillFirstName(), disabled:false}, [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.minLength(3)]);
  last_name: FormControl = new FormControl({value:this.fillLastName(), disabled:false}, [Validators.required, Validators.pattern("[a-zA-Z ]*"),Validators.minLength(3)]);
  e_mail: FormControl = new FormControl({value:this.fillEmail(), disabled:false}, [Validators.required, Validators.email]);
  phone_number: FormControl = new FormControl({value:this.fillPhoneNumber(), disabled:false}, [Validators.required, Validators.pattern("[0-9]{10}")])
  game_date: FormControl = new FormControl("", [Validators.required]);
  game_time: FormControl = new FormControl("", [Validators.required]);
  players: FormControl = new FormControl("", [Validators.required]);
  isLoading: boolean = false;
  errorHidden: boolean = true;

  Player!:Player;
  Rooms: any;
  alert: boolean = false;
  errorAlert: boolean = false;
  message!: string;
  dt: any;
  dataDisplay: any;
  room: Room | undefined;
  book!: Book;
  books!: Array<Book>;
  isHidden: boolean = false;
  isDisabled: boolean = true;
  isChecked!: boolean;
  title = 'stipe-angular';
  amount!: number;
  token: any;
  hourList: TimeSelectObject[] = [];
  today = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3));

  id = this.actRoute.snapshot.params['roomId'];

  constructor(private formBuilder: FormBuilder, private actRoute: ActivatedRoute, private roomService: RoomService, private bookService: BookService) {
    this.form = this.formBuilder.group({
      first_name: this.first_name,
      last_name: this.last_name,
      e_mail: this.e_mail,
      phone_number: this.phone_number,
      game_date: this.game_date,
      game_time: this.game_time,
      players: this.players
    });
  }

  ngOnInit(): void {

    this.roomService.getRoom(this.id).subscribe(
      {
        next: response => {
          this.room = response;
          this.dt = response;
          this.dataDisplay = this.dt.data;

          this.bookService.getAvailableDates(this.id).subscribe(
            {
              next: response => {
                this.books = response;
                this.dt = response;
                this.dataDisplay = this.dt.data;
              },
              error: e => console.log(e),
              complete: () => console.log(this.books)
            }
          )
        },
        error: e => console.log(e),
        complete: () => console.log(this.room)
      }
    );


  }

  fillFirstName():string{
    var player = window.localStorage.getItem("player")
    if(player){
      if (typeof(player) === 'string'){
        this.Player = JSON.parse(player)
        return this.Player.FirstName
      }
    }
    return ''
  }

  fillLastName():string{
    var player = window.localStorage.getItem("player")
    if(player){
      if (typeof(player) === 'string'){
        this.Player = JSON.parse(player)
        return this.Player.LastName
      }
    }
    return ''
  }

  fillEmail():string{
    var player = window.localStorage.getItem("player")
    if(player){
      if (typeof(player) === 'string'){
        this.Player = JSON.parse(player)
        return this.Player.Email
      }
    }
    return ''
  }

  fillPhoneNumber():string{
    var player = window.localStorage.getItem("player")
    if(player){
      if (typeof(player) === 'string'){
        this.Player = JSON.parse(player)
        return this.Player.PhoneNumber
      }
    }
    return ''
  }


  showAvailability(bookings: Book[]) {
    var hours: string[] = [];
    bookings.forEach(book => {
      var playTime = book.GameTime.toString().substring(11, 16)
      hours.push(playTime)
    })
    for (let i = 0; i < this.hourList.length; i++) {
      var time = this.hourList[i].Time.toTimeString().substring(0, 5);
      if (hours.includes(time)) {
        this.hourList[i].IsDisabled = true;
        this.hourList[i].Color = "red";
      }
    }
  }


  GetBookDate(e: any) {
    this.isDisabled = false;
    if (this.books.length != 0) {
      var date = e.target.value;
      var filteredBooks: Book[] = [];
      this.books.forEach(element => {
        var playDay = element.GameDate.toString().substring(0, 10)
        if (playDay == date) {
          filteredBooks.push(element);
        }

      });

      this.showAvailability(filteredBooks);
    }
  }

  onCheckout(roomId: number, firstName: string, lastName: string, email: string, phoneNumber: string, gameDate: Date, numberOfPlayers: string, gameTime: string) {
    if (this.form.status == "VALID") {
      this.form.disable();
      this.isLoading = true;
      var kati = numberOfPlayers.substring(0, 1);
      var totalPrice = this.showTotalPrice(+kati);
      var newDate = this.ConvertStringForGameHour(gameTime);
      var handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51LcUDrDl59dROsBALAOiUYf5Jfza8MYrK8k3fQiOHafJJ8vGpcPawwp9Rd4m2wp4Kf0fQP2wLwjH59eMuOoLUYWS00dfCsCjlI',
        locale: 'auto',
        token: (token: any) => {
          this.token = `token : ${token.id}`;
          this.bookService.payBookWithCard({ RoomId: roomId, FirstName: firstName, LastName: lastName, Email: email, PhoneNumber: phoneNumber, GameDate: gameDate, NumberOfPlayers: +kati, GameTime: newDate, IsSubscribed: this.isChecked } as Book).subscribe(
            {

              next: response => console.log(response),

              error: () => this.errorHandler(),

              complete: () => this.submitdone("Payment")

            }
          )
        }

      });
      handler.open({
        name: 'Anikhtoi',
        description: 'Escape Room Project',
        amount: totalPrice * 100,
        currency: 'eur'
      });
    }
  }

  GoToPayPal(roomId: number, firstName: string, lastName: string, email: string, phoneNumber: string, numberOfPlayers: string, gameDate: Date, gameTime: string) {
    if (this.form.status == "VALID") {
      this.form.disable();
      this.isLoading = true;
      var kati = numberOfPlayers.substring(0, 1);
      var newDate = this.ConvertStringForGameHour(gameTime);
      var sub = this.isChecked == true ? "true" : "false"
      window.location.href = 'https://localhost:44368/Paypal/Index?roomId=' + roomId + '&firstName=' + firstName + '&lastName=' + lastName
        + '&email=' + email + '&phoneNumber=' + phoneNumber + '&numberOfPlayers=' + +kati + '&gameDate=' + gameDate.toJSON() + '&gameTime=' + newDate.toJSON()
        + '&subscribed=' + sub;

    }

  }

  getTimeArray(duration: number): void {
    let startDate: Date = new Date(2022, 9, 5, 18, 0, 0);
    let endDate: Date = new Date(2022, 9, 5, 23, 0, 0);
    this.hourList = [];
    var dt: Date = new Date(startDate);
    while (dt <= endDate) {
      var obj = new TimeSelectObject;
      obj.Time = new Date(dt);
      obj.IsDisabled = false;
      this.hourList.push(obj);
      dt.setMinutes(dt.getMinutes() + duration + 10);
    }

  }


  getNumberOfPlayers(length: number): Array<number> {
    var arr: number[] = [];
    for (let i = 2; i <= length; i++) {
      arr.push(i);
    }

    return arr;
  }

  showTotalPrice(players: number): number {

    if (this.room) {
      var price = (players > 2 ? (this.room.StartingPricePerPerson * players) - (this.room.StartingPricePerPerson * players * this.room.DiscountPerPerson)
        : this.room.StartingPricePerPerson * players)
      return Math.floor(price);
    }
    else {
      return 0;
    }
  }

  submitdone(message: string) {
    this.alert = !this.alert;
    this.alert = true;
    this.message = message;
    this.isHidden = true;
  }

  errorHandler() {
    this.errorAlert = !this.errorAlert;
    this.errorAlert = true;
    this.isHidden = true;
  }


  ConvertStringForGameHour(dateString: string): Date {
    const date = 'Wed Sep 07 2022 00:00:00 GMT';
    const t1: any = dateString.split(' ');
    const t2: any = t1[0].split(':');
    t2[0] = (t1[1] === 'PM' ? (1 * t2[0] + 12) : t2[0]);
    const time24 = (t2[0] < 10 ? '0' + t2[0] : t2[0]) + ':' + t2[1] + ':00';
    var completeDate = date.replace("00:00:00", time24.toString());
    let newDate = new Date(completeDate);
    var utc_date = new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(),
      newDate.getUTCDate(), newDate.getUTCHours(),
      newDate.getUTCMinutes(), newDate.getUTCSeconds());
    return utc_date;
  }


  hasSubscribed(e: any) {
    if (e.target.checked == true) {
      this.isChecked = true;
    }
    else {
      this.isChecked = false;
    }
  }


  CreateBookHandler(roomId: number, firstName: string, lastName: string, email: string, phoneNumber: string, gameDate: Date, numberOfPlayers: string, gameTime: string) {
    if (this.form.status == "VALID") {
      this.form.disable();
      this.isLoading = true;
      console.log(roomId, firstName, lastName, gameDate, numberOfPlayers, gameTime, email, phoneNumber);

      var kati = numberOfPlayers.substring(0, 1);
      console.log(kati);
      console.log(gameTime);
      var newDate = this.ConvertStringForGameHour(gameTime);

      console.log(newDate);
      this.bookService.createBook({ RoomId: roomId, FirstName: firstName, LastName: lastName, Email: email, PhoneNumber: phoneNumber, GameDate: gameDate, NumberOfPlayers: +kati, GameTime: newDate, IsSubscribed: this.isChecked } as Book).subscribe(
        {

          next: response => console.log(response),

          error: () => this.errorHandler(),//error => console.log(error),

          complete: () => this.submitdone("Booking")//console.log("Petuxe")

        })

    }
  }

 

}
