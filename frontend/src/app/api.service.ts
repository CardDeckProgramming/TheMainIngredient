import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
//These functions allow us to communicate with the server, see how the uri variable is used in all the http method calls 
//Example: ${this.uri}/recipes uses the http://localhost:400 uri to connect to the server we created and call the APIs set in the server.js (found in backend folder)
export class APIService {

  uri = 'http://localhost:4000';

  constructor(private userService: UserService, private http: HttpClient) { }

  //Account Collection
  //Add Account
  addAccount(first, last, gender, email, password, bio): Observable<Object> {
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
  getAccount(email, password): Observable<Object> {
    return this.http.get(`${this.uri}/accounts/${email}/${password}`);
  }

  //Get Account (Profile) By Id
  getAccountById(id): Observable<Object> {
    return this.http.get(`${this.uri}/accounts/${id}`);
  }

  //Update Account (Profile)
  updateAccount(first, last, gender, bio): Observable<Object> {
    const account = {
      first: first,
      last: last,
      gender: gender,
      bio: bio
    }
    return this.http.post(`${this.uri}/accounts/update/${this.userService.getAccountId()}`, account);
  }

  //Add Recipe Ref to Account
  addAccountRecipeId(recipeId): Observable<Object> {
    const account = {
      recipeId: recipeId
    }
    return this.http.post(`${this.uri}/accounts/${this.userService.getAccountId()}/recipes/add`, account);
  }

  //Get Recipes based on the Account Id
  getAccountRecipes(id): Observable<Object> {
    return this.http.get(`${this.uri}/accounts/${id}/recipes/all`);
  }

  //Get Account Recipes By Sorting Type
  getAccountRecipesByType(id, type): Observable<Object> {
    return this.http.get(`${this.uri}/accounts/${id}/recipes/${type}`);
  }

  //Delete Account
  deleteAccount(id): Observable<Object> {
    return this.http.get(`${this.uri}/account/delete/${id}`);
  }

  //Delete Recipe (from account foreign key too)
  deleteRecipe(accountId, recipeId): Observable<Object> {
    return this.http.get(`${this.uri}/account/${accountId}/recipes/delete/${recipeId}`);
  }

  //Add Follow
  addFollow(id, followId): Observable<Object> {
    const account = {
      followId: followId
    }
    return this.http.post(`${this.uri}/account/${id}/follows/add`, account);
  }

  getAccountFollows(id): Observable<Object> {
    return this.http.get(`${this.uri}/account/${id}/follows/all`);
  }



  //Recipe Collection
  //Recipe Add
  addRecipe(author, title, type, ingredients, steps): Observable<Object> {
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
  getRecipes(): Observable<Object> {
    return this.http.get(`${this.uri}/recipes`);
  }

  //Get Recipe By Id
  getRecipeById(id): Observable<Object> {
    return this.http.get(`${this.uri}/recipes/${id}`);
  }

  //Update Recipe
  updateRecipe(id, author, title, type, ingredients, steps): Observable<Object> {
    const recipe = {
      author: author,
      title: title,
      type: type,
      ingredients: ingredients,
      steps: steps
    };
    return this.http.post(`${this.uri}/recipes/update/${id}`, recipe);
  }



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



  //Revew Collection
  addReview(title, score, writtenReview): Observable<Object> {
    const review = {
      title: title,
      score: score,
      review: writtenReview
    };
    return this.http.post(`${this.uri}/reviews/add`, review);
  }

  addAccountReviewId(reviewId): Observable<Object> {
    const account = {
      reviewId: reviewId
    }
    return this.http.post(`${this.uri}/accounts/${this.userService.getAccountId()}/reviews/add`, account);
  }

  addRecipeReviewId(id, reviewId): Observable<Object> {
    const recipe = {
      reviewId: reviewId
    }
    return this.http.post(`${this.uri}/recipes/${id}/reviews/add`, recipe);
  }

  getAccountReviews(id): Observable<Object> {
    return this.http.get(`${this.uri}/account/${id}/reviews/all`);
  }



  //Search Collection
  getAccountBySearch(first, last): Observable<Object> {
    return this.http.get(`${this.uri}/search-results/search?firstName=${first}&lastName=${last}`);
  }
}
