import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { ContactService } from './contact.service';
import { Contact } from './contactModel';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

	Contact:Contact | undefined
	form: FormGroup;
	name: FormControl = new FormControl("", [Validators.required]);
	email: FormControl = new FormControl("", [Validators.required, Validators.email]);
	message: FormControl = new FormControl("", [Validators.required, Validators.maxLength(256)]);
	honeypot: FormControl = new FormControl(""); // we will use this to prevent spam
	submitted: boolean = true; // show and hide the success message
	isLoading: boolean = false; // disable the submit button if we're loading
	responseMessage?: string; // the response message to show to the user
	constructor(private formBuilder: FormBuilder, private contactService: ContactService) {
		this.form = this.formBuilder.group({
			name: this.name,
			email: this.email,
			message: this.message,
			honeypot: this.honeypot
		});
	}

	onSubmit(name:string, email:string, message:string): void {
		if (this.form.status == "VALID" && this.honeypot.value == "") {
			this.form.disable(); // disable the form if it's valid to disable multiple submissions
			
			this.isLoading = true; // sending the post request async so it's in progress
			this.submitted = false; // hide the response message on multiple submits
			this.contactService.createContact({Name: name, Email: email, Message: message} as Contact).subscribe(
				{
					next: response => this.CreateContactHandler(response) ,
					error: error => {
						this.responseMessage = "Oops! An error occurred... Reload the page and try again."
						this.form.enable(); // re enable the form after a success
						this.submitted = true; // show the response message
						this.isLoading = false; // re enable the submit button
						console.log(error)},
					complete: () => console.log("petuxe")
				});
				
		}
	};

	CreateContactHandler(response: any){
		 this.responseMessage = "Thanks for the message! I'll get back to you soon!";
		 this.form.enable(); // re enable the form after a success
		 this.form.reset();
		 this.submitted = false; // show the response message
		 this.isLoading = false; // re enable the submit button
		 console.log(response);
					    
	}

	ngOnInit(): void {
		
	}

}
