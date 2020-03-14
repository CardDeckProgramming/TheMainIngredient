import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//This service will help us control account functionality, currently after a user signs in, the loggedIn variable is set to true 
//which turns on the fancy side bar functionality
export class UserService {

  private accountLoggedIn: boolean = false;
  private accountId: string = '';
  private accountEmail: string = '';
  private accountPassword: string = '';
  private contactId: string = '';
  private contactEmail: string = '';
  private ContactMessage: string = '';

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
  public getContactEmail() {
    return this.contactEmail;
  }

  public setContactEmail(contactEmail: string) { 
    this.contactEmail = contactEmail; 
  }
  public getContactMessage() {
    return this.contactEmail;
  }

  public setcontactMessage(contactEmail: string) { 
    this.accountEmail = contactEmail; 
  }

}
