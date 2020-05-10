import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {

   uri = environment.uri;
 
   constructor(private userService: UserService, private http: HttpClient) { }

   addReview(title, userName, score, writtenReview): Observable<Object> {
      const review = {
         title: title,
         recipeBy: userName,
         score: score,
         review: writtenReview,
         reviewBy: this.userService.getAccountFirst()
      };
      return this.http.post(`${this.uri}/reviews/add`, review);
   }

   getReviewById(id): Observable<Object> {
      return this.http.get(`${this.uri}/reviews/${id}`);
   }

}