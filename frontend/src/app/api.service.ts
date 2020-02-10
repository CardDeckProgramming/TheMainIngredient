import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//These functions allow us to communicate with the server, see how the uri variable is used in all the http method calls 
//Example: ${this.uri}/recipes uses the http://localhost:400 uri to connect to the server we created and call the APIs set in the server.js (found in backend folder)
export class APIService {

  uri = 'http://localhost:4000';

  private accountIdSource = new Subject<string>();
  accountId$ = this.accountIdSource.asObservable();

  constructor(private http: HttpClient) { }

  sendAccountId(account: string) {
    this.accountIdSource.next(account);
  }

  addAccount(email, password) {
    const account = {
      email: email,
      password: password
    }
    return this.http.post(`${this.uri}/accounts/add`, account);
  }

  getAccount(id) {
    return this.http.get(`${this.uri}/accounts/account/${id}`);
  }

  getRecipes() {
    return this.http.get(`${this.uri}/recipes`);
  }

  getIssueById(id) {
    return this.http.get(`${this.uri}/recipes/${id}`);
  }

  addRecipe(author, title, type, ingredients, steps) {
    const recipe = {
      author: author,
      title: title,
      type: type,
      ingredients: ingredients,
      steps: steps
    }
    return this.http.post(`${this.uri}/recipes/add`, recipe);
  }

  updateIssue(id, title, responsible, description, severity, status) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    };
    return this.http.post(`${this.uri}/recipes/update/${id}`, issue);
  }

  deleteIssue(id) {
    return this.http.get(`${this.uri}/recipes/delete/${id}`);
  }
}
