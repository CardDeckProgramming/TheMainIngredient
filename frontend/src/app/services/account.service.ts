import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

   uri = 'http://localhost/api';
 
   constructor(private userService: UserService, private http: HttpClient) { }


   //Account APIs
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
 
   updateAccount(first, last, gender, bio): Observable<Object> {
      const account = {
         first: first,
         last: last,
         gender: gender,
         bio: bio
      }
      return this.http.post(`${this.uri}/accounts/update/${this.userService.getAccountId()}`, account);
   }

   deleteAccount(id): Observable<Object> {
      return this.http.get(`${this.uri}/account/delete/${id}`);
   }

   getAccountById(id): Observable<Object> {
      return this.http.get(`${this.uri}/accounts/${id}`);
   }

   //was getAccount
   signIntoAccount(email, password): Observable<Object> {
      return this.http.get(`${this.uri}/accounts/${email}/${password}`);
   }
 

   //Account-Recipe APIs
   //addAccountRecipeId
   addRecipeToAcount(recipeId): Observable<Object> {
      const account = {
         recipeId: recipeId
      }
      return this.http.post(`${this.uri}/accounts/${this.userService.getAccountId()}/recipes/add`, account);
   }

   //was deleteRecipe
   deleteRecipeFromAccount(accountId, recipeId): Observable<Object> {
      return this.http.get(`${this.uri}/account/${accountId}/recipes/delete/${recipeId}`);
   }
 
   //was getAccountRecipes
   getRecipesByAccountId(id): Observable<Object> {
      return this.http.get(`${this.uri}/accounts/${id}/recipes/all`);
   }
 
   //Get Account Recipes By Sorting Type
   getAccountRecipesByType(id, type): Observable<Object> {
      return this.http.get(`${this.uri}/accounts/${id}/recipes/${type}`);
   }


   //Account-Review APIs
   //was addAccountReviewId
   addReviewToAccount(reviewId): Observable<Object> {
      const account = {
        reviewId: reviewId
      }
      return this.http.post(`${this.uri}/accounts/${this.userService.getAccountId()}/reviews/add`, account);
   }

   //was deleteReview
   deleteReviewFromAccount(id, reviewId): Observable<Object> {
      return this.http.get(`${this.uri}/account/${id}/reviews/delete/${reviewId}`);
   }

   //was getAccountReviews
   getReviewsByAccountId(id): Observable<Object> {
      return this.http.get(`${this.uri}/account/${id}/reviews/all`);
   }


   //Account-Follow APIs
   //was addFollow
   addFollowToAccount(id, followId): Observable<Object> {
      const account = {
         followId: followId
      }
      return this.http.post(`${this.uri}/account/${id}/follows/add`, account);
   }
 
   //was deleteFollow
   deleteFollowFromAccount(id, followId): Observable<Object> {
      return this.http.get(`${this.uri}/account/${id}/follows/delete/${followId}`);
   }

   //was getAccountFollows
   getFollowsByAccountId(id): Observable<Object> {
      return this.http.get(`${this.uri}/account/${id}/follows/all`);
   }

}