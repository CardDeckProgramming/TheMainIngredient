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

  constructor(private userService: UserService, private http: HttpClient) { }

  addAccount(first, last, gender, email, password, bio) {
    const account = {
      first: first,
      last: last,
      gender: gender,
      email: email,
      password: password,
      bio: bio
    }
    return this.http.post(`${this.uri}/accounts/add`, account);
  }

  //Log Into Account 
  getAccount(email, password) {
    return this.http.get(`${this.uri}/accounts/${email}/${password}`);
  }

  //Get Account (Profile) By Id
  getAccountById(id) {
    return this.http.get(`${this.uri}/accounts/${id}`);
  }

  //Update Account (Profile)
  updateAccount(first, last, gender, bio)
  {
    const account = {
      first: first,
      last: last,
      gender: gender,
      bio: bio
    }
    return this.http.post(`${this.uri}/accounts/update/${this.userService.getAccountId()}`, account);
  }

  //Add Recipe Ref to Account
  addAccountRecipeId(recipeId) {
    const account = {
      recipeId: recipeId
    }
    console.log('Add Account Recipe ID Here');
    return this.http.post(`${this.uri}/accounts/${this.userService.getAccountId()}/recipes/add`, account);
  }

  //Get Recipes based on the Account Id
  getAccountRecipes(id) {
    return this.http.get(`${this.uri}/accounts/${id}/recipes/all`);
  }

  //Get Account Recipes By Sorting Type
  getAccountRecipesByType(id, type) {
    return this.http.get(`${this.uri}/accounts/${id}/recipes/${type}`);
  }

  //Delete Account
  deleteAccount(id) {
    return this.http.get(`${this.uri}/accounts/delete/${id}`);
  }



  //Recipe Collection
  //Recipe Add
  addRecipe(author, title, type, ingredients, steps) {
    const recipe = {
      author: author,
      title: title,
      type: type,
      ingredients: ingredients,
      steps: steps
    }
    console.log('Add Recipe Here');
    return this.http.post(`${this.uri}/recipes/add`, recipe);
  }

  //Get All Recipes
  getRecipes() {
    return this.http.get(`${this.uri}/recipes`);
  }

  //Get Recipe By Id
  getRecipeById(id) {
    return this.http.get(`${this.uri}/recipes/${id}`);
  }

  //Update Recipe
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

  //Delete Recipe
  deleteRecipe(id) {
    return this.http.get(`${this.uri}/recipes/delete/${id}`);
  }



  //Contact Colleaction
  //Add Contact
  addContact(email, message) {
    const contact = {
      email: email,
      message: message
    }
    return this.http.post(`${this.uri}/contact/add`,contact);
  }

  //Get Contact
  getContact(email, message) {
    return this.http.get(`${this.uri}/contact/${email}/${message}`);
  }
}
