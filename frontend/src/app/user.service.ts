import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//This service will help us control account functionality, currently after a user signs in, the loggedIn variable is set to true 
//which turns on the fancy side bar functionality
export class UserService {

  private accountLoggedIn: boolean = false;
  private accountId: string = '';
  private accountFirst: string = '';
  private accountEmail: string = '';
  private accountPassword: string = '';

  public isAccountLoggedIn(): boolean { 
    return this.accountLoggedIn; 
  }

  public setAccountLoggedIn(accountLoggedIn: boolean) { 
    this.accountLoggedIn = accountLoggedIn; 
  }

  public getAccountId() {
    return this.accountId;
  }

  public setAccountId(accountId: string) { 
    this.accountId = accountId; 
  }

  public getAccountFirst() {
    return this.accountFirst;
  }

  public setAccountFirst(accountFirst: string) { 
    this.accountFirst = accountFirst; 
  }

  public getAccountEmail() {
    return this.accountEmail;
  }

  public setAccountEmail(accountEmail: string) { 
    this.accountEmail = accountEmail; 
  }

  public getAccountPassword() {
    return this.accountPassword;
  }

  public setAccountPassword(accountPassword: string) { 
    this.accountPassword = accountPassword; 
  }

}
