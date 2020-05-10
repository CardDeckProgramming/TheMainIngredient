import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

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
              private reviewService: ReviewService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.userService.isAccountLoggedIn()) {

      this.route.params.subscribe(params => {
        this.reviewId = params.reviewId;
        this.recipeTitle = params.recipeTitle;
      });

      this.reviewService.getReviewById(this.reviewId).subscribe((data: Review) => {
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
