import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AccountService } from '../../services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  createProfileForm: FormGroup;
  email: string;
  password: string;

  constructor(private accountService: AccountService, 
              private formBuilder: FormBuilder, 
              private router: Router, 
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.createProfileForm = this.formBuilder.group({
        first: ['', Validators.required],
        last: ['', Validators.required],
        gender: ['', Validators.required],
        bio: ['']
      });

      this.email = params.email;
      this.password = params.password;
    });
  }

  addAccount() {
    this.accountService.addAccount(this.createProfileForm.get('first').value, 
                                   this.createProfileForm.get('last').value, 
                                   this.createProfileForm.get('gender').value, 
                                   this.email, 
                                   this.password, 
                                   this.createProfileForm.get('bio').value).subscribe(response => {
                                 
      if (JSON.parse(JSON.stringify(response)) != null) {
        this.userService.setAccountId(JSON.parse(JSON.stringify(response['accountId'])));
        this.userService.setAccountFirst(JSON.parse(JSON.stringify(response['accountFirst'])));
        this.userService.setAccountEmail(JSON.parse(JSON.stringify(response['accountEmail'])));
        this.userService.setAccountPassword(JSON.parse(JSON.stringify(response['accountPassword'])));
        this.userService.setAccountLoggedIn(true);
        this.router.navigate([`/list`]);
        this.snackBar.open('Welcome to The Main Ingredient ' + this.userService.getAccountFirst() + '!', 'Dismiss', { duration: 2500, verticalPosition: 'top', panelClass: ['snackBarSucess'] });
      } else {
        this.snackBar.open('Error: Error saving account', 'Dismiss', { verticalPosition: 'top', panelClass: ['snackBarError'] });
      }
    });
  }
}
