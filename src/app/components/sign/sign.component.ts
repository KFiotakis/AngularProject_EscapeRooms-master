import { Component, OnInit } from '@angular/core';
import { SignService } from './sign.service';
import { Player } from './signModels';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  signUpForm: FormGroup;
  first_name: FormControl = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.minLength(3)]);
  last_name: FormControl = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.minLength(3)]);
  e_mail: FormControl = new FormControl("", [Validators.required, Validators.email]);
  pass_word: FormControl = new FormControl("", [Validators.required])
  phone_number: FormControl = new FormControl("", [Validators.required, Validators.pattern("[0-9]{10}")])
  signInForm!: FormGroup;

  e_mailSignIn: FormControl = new FormControl("", [Validators.required, Validators.email]);
  pass_wordSignIn: FormControl = new FormControl("", [Validators.required])
  isLoading: boolean = false;

  Players!: Array<Player>
  errorHidden: boolean = true

  dt: any;
  dataDisplay: any;
  SignInPlayer!: Player

  constructor(private signService: SignService, private router: Router, private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      first_name: this.first_name,
      last_name: this.last_name,
      e_mail: this.e_mail,
      pass_word: this.pass_word,
      phone_number: this.phone_number,
    })
    this.signInForm = this.formBuilder.group({
      e_mailSignIn: this.e_mailSignIn,
      pass_wordSignIn: this.pass_wordSignIn
    })
  }

  ngOnInit(): void {

    this.signService.getPlayers().subscribe({
      next: response => {
        this.Players = response;
        this.dt = response;
        this.dataDisplay = this.dt.data;
      },
      error: error => console.log(error),
      complete: () => console.log(this.Players)
    })
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


  createPlayerHandler(firstname: string, lastname: string, email: string, phoneNumber: string) {
    if (this.signUpForm.status == "VALID") {
      this.signUpForm.disable();
      this.isLoading = true;
      this.signService.createPlayer({ FirstName: firstname, LastName: lastname, Email: email, PhoneNumber: phoneNumber } as Player).subscribe(
        {
          next: response => console.log(response),
          error: error => console.log(error),

          complete: () => {
            window.alert('Successful Reservation!'),
              this.router.navigate(['/Home'])
          }
        }
      )
    }
  }


  signInPlayerHandler(email: string) {
    if (this.Players) {
      var player = this.Players.find(p => p.Email == email)
    }
    if (this.signInForm.status == "VALID" && player) {
      this.signInForm.disable();
      this.isLoading = true;
      window.localStorage.setItem("player", JSON.stringify(player))
      this.router.navigate(['/Home']).then(() => { window.location.reload() });
    }
    else {
      this.errorHidden = false
    }

    // if(this.signInForm.status == "VALID"){
    //   this.signInForm.disable();
    //  this.isLoading = true;

    //   if (player){
    //     window.localStorage.setItem("player", JSON.stringify(player))
    //     console.log(player);
    //     this.router.navigate(['/Home']).then(() => { window.location.reload()});
    //   }
    //   else{
    //     this.errorHidden = false
    //  }
    // }


  }


}
