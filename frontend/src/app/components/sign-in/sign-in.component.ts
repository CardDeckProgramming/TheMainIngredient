import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../../api.service';
import { UserService } from 'src/app/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  hide: boolean = true;

  constructor(private apiService: APIService, private fb: FormBuilder, private router: Router, private userService: UserService, private snackBar: MatSnackBar) { }

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
        this.userService.setAccountFirst(JSON.parse(JSON.stringify(response['first'])));
        this.userService.setAccountEmail(JSON.parse(JSON.stringify(response['email'])));
        this.userService.setAccountPassword(JSON.parse(JSON.stringify(response['password'])));
        this.userService.setAccountLoggedIn(true);
        this.router.navigate([`/list`]);
        this.snackBar.open('Welcome back ' + this.userService.getAccountFirst() + '!', 'Dismiss', {duration: 2500, verticalPosition: 'top', panelClass: ['snackBarSucess']});
      } else {
        this.snackBar.open('Error: Invalid login credentials', 'Dismiss', {verticalPosition: 'top', panelClass: ['snackBarError']});
      }
    });
  }

  /*
  When the sign up button is clicked, this function is called. Here we call our addAccount from the apiService object we made
  Note: Remember the apiService (api.service.ts) holds all of our api function calls we send to the server  
  */
  signUp() {
    this.apiService.getAccount(this.signInForm.get('email').value, this.signInForm.get('password').value).subscribe(response => {
      if (JSON.parse(JSON.stringify(response)) == null) {
        let email = this.signInForm.get('email').value;
        let password = this.signInForm.get('password').value;
        this.router.navigate([`/create-profile/${email}/${password}`]);
      } else {
        this.snackBar.open('Error: This email is already being used', 'Dismiss', { verticalPosition: 'top', panelClass: ['snackBarError'] });
      }
    });
  }

}
