import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
//These functions allow us to communicate with the server, see how the uri variable is used in all the http method calls 
//Example: ${this.uri}/recipes uses the http://localhost:400 uri to connect to the server we created and call the APIs set in the server.js (found in backend folder)
export class APIService {

  uri = 'http://localhost:4000';

  private accountIdSource = new Subject<string>();
  accountId$ = this.accountIdSource.asObservable();

  constructor(private userService: UserService, private http: HttpClient) { }

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

  getAccount(email, password) {
    return this.http.get(`${this.uri}/accounts/getAccount/${email}/${password}`);
  }

  addAccountRecipeId(recipeId) {
    const account = {
      recipeId: recipeId
    }
    return this.http.post(`${this.uri}/accounts/${this.userService.getAccountId()}/addRecipe`, account);
  }

  getAccountRecipes() {
    return this.http.get(`${this.uri}/accounts/${this.userService.getAccountId()}/recipes`);
  }

  getRecipes() {
    return this.http.get(`${this.uri}/recipes`);
  }

  getRecipeById(id) {
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

  updateRecipe(id, author, title, type, ingredients, steps) {
    const recipe = {
      author: author,
      title: title,
      type: type,
      ingredients: ingredients,
      steps: steps
    };
    return this.http.post(`${this.uri}/recipes/update/${id}`, recipe);
  }

  deleteIssue(id) {
    return this.http.get(`${this.uri}/recipes/delete/${id}`);
  }
}
