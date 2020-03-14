import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../../api.service';
import{MatSnackBar} from '@angular/material';
import { UserService } from 'src/app/user.service';
import { from } from 'rxjs';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactUsForm: FormGroup;
  constructor(private apiService: APIService, private fb: FormBuilder, private router: Router, private userService: UserService,private snackBar:MatSnackBar) { }

  ngOnInit() 
  {
    this.contactUsForm= this.fb.group({
      email: ['', Validators.required],
      message: ['', Validators.required]
    });

}


/*
When the sign up button is clicked, this function is called. Here we call our addAccount from the apiService object we made
Note: Remember the apiService (api.service.ts) holds all of our api function calls we send to the server  
*/
submit() {
  this.apiService.addContact(this.contactUsForm.get('email').value, this.contactUsForm.get('message').value).subscribe(response => {
    this.router.navigate([``]);
    this.snackBar.open('MESSAGE SENT SUCCESFULLY','Dismiss',{duration:5000,verticalPosition:'top'});
  });
}

}

