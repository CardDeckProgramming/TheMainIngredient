import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

   uri = environment.uri;
 
   constructor(private userService: UserService, private http: HttpClient) { }

   
   //Recipe APIs
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

   getRecipes(): Observable<Object> {
      return this.http.get(`${this.uri}/recipes`);
   }

   getRecipeById(id): Observable<Object> {
      return this.http.get(`${this.uri}/recipes/${id}`);
   }


   //Recipe-Review APIs
   //was addRecipeReviewId
   addReviewToRecipe(id, reviewId): Observable<Object> {
      const recipe = {
        reviewId: reviewId
      }
      return this.http.post(`${this.uri}/recipes/${id}/reviews/add`, recipe);
   }

   //was getRecipeReviews
   getReviewsByRecipeId(id): Observable<Object> {
      return this.http.get(`${this.uri}/recipes/${id}/reviews/all`);
   }
}