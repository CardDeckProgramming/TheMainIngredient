import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { Review } from '../../review.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.css']
})
export class ViewReviewComponent implements OnInit {

  reviewId: string;
  recipeTitle: string;
  review: Review;
  recipeBy: any;
  score: any;
  writtenReview: any;

  constructor(private userService: UserService, 
              private apiService: APIService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.userService.isAccountLoggedIn()) {

      this.route.params.subscribe(params => {
        this.reviewId = params.reviewId;
        this.recipeTitle = params.recipeTitle;
        console.log(this.reviewId);
        console.log(this.recipeTitle);
      });

      this.apiService.getReviewById(this.reviewId).subscribe((data: Review) => {
        this.review = data;

        this.recipeBy = this.review.recipeBy;
        this.score = this.review.score;
        this.writtenReview = this.review.review;
      });
    } else {
      this.router.navigate([`/home`]);
    }
  }

}
