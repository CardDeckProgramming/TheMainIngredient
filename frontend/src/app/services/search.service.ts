import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  uri = environment.uri;

  constructor(private userService: UserService, private http: HttpClient) { } 
  /*
  //Contact Collection
  //Add Contact
  addContact(email, message): Observable<Object> {
    const contact = {
      email: email,
      message: message
    }
    return this.http.post(`${this.uri}/contact/add`,contact);
  }

  //Get Contact
  getContact(email, message): Observable<Object> {
    return this.http.get(`${this.uri}/contact/${email}/${message}`);
  }
  */

  //Search Collection
  getAccountBySearch(first, last): Observable<Object> {
    return this.http.get(`${this.uri}/search?firstName=${first}&lastName=${last}`);
  }
}
