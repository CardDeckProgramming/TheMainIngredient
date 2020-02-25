import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../../api.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private apiService: APIService, private fb: FormBuilder, private router: Router, private userService: UserService) { }

  /*
  When we load this component, the code in this method will run automatically,
  here we want use the signInForm (which is a FormGroup object) to create our sign in form.
  We state in the signInForm object we want an email, and a password (the '' state we want text
  and the Validators.required means we expect the field to be filled in when we submit the data
  */
  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logIn() {
    this.apiService.getAccount(this.signInForm.get('email').value, this.signInForm.get('password').value).subscribe(response => {
      if (JSON.parse(JSON.stringify(response)) != null) {
        this.userService.setAccountId(JSON.parse(JSON.stringify(response['_id'])));
        this.userService.setAccountEmail(JSON.parse(JSON.stringify(response['email'])));
        this.userService.setAccountPassword(JSON.parse(JSON.stringify(response['password'])));
        this.userService.setAccountLoggedIn(true);
        this.router.navigate([`/list`]);
      } else {
        console.log('Error!!!');
      }
    });
  }

  /*
  When the sign up button is clicked, this function is called. Here we call our addAccount from the apiService object we made
  Note: Remember the apiService (api.service.ts) holds all of our api function calls we send to the server  
  */
  signUp() {
    this.apiService.addAccount(this.signInForm.get('email').value, this.signInForm.get('password').value).subscribe(response => {
      this.userService.setAccountId(JSON.parse(JSON.stringify(response['accountId'])));
      this.userService.setAccountEmail(JSON.parse(JSON.stringify(response['accountEmail'])));
      this.userService.setAccountPassword(JSON.parse(JSON.stringify(response['accountPassword'])));
      this.userService.setAccountLoggedIn(true);
      this.router.navigate([`/list`]);
    });
  }

}
