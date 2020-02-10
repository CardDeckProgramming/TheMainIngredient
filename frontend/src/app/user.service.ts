import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//This service will help us control account functionality, currently after a user signs in, the loggedIn variable is set to true 
//which turns on the fancy side bar functionality
export class UserService {

  private loggedIn: boolean = false;

  public isLoggedIn() { return this.loggedIn; }

  public setLoggedIn(loggedIn: boolean) { this.loggedIn = loggedIn; }
}
