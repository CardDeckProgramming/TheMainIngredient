import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ReviewService } from 'src/app/services/review.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {

  userName: string;
  userId: string;
  recipeId: string;
  recipeTitle: string;
  reviewForm: FormGroup;

  constructor(private userService: UserService, 
              private fb: FormBuilder, 
              private accountService: AccountService,
              private recipeService: RecipeService, 
              private reviewService: ReviewService, 
              private router: Router, 
              private route: ActivatedRoute, 
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.userService.isAccountLoggedIn()) {

      this.route.params.subscribe(params => {
        this.userName = params.userName;
        this.userId = params.userId;
        this.recipeId = params.recipeId;
        this.recipeTitle = params.recipeTitle;
      });
      this.createForm();
    } else {
      this.router.navigate([`/home`]);
    }
  }

  createForm(): void {
    this.reviewForm = this.fb.group({
      score: ['', Validators.required],
      review: ['', Validators.required]
    });
  }

  saveReview(): void {
    this.reviewService.addReview(this.recipeTitle,
                              this.userName.replace('_', ' '),
                              this.reviewForm.get('score').value, 
                              this.reviewForm.get('review').value).subscribe((response) => {
      this.accountService.addReviewToAccount(JSON.parse(JSON.stringify(response['reviewId']))).subscribe(response => {
        this.recipeService.addReviewToRecipe(this.recipeId, JSON.parse(JSON.stringify(response['reviewId']))).subscribe(response => {
          this.router.navigate(['/user-view/' + this.userName + '/' + this.userId]);
          this.snackBar.open('Review submitted successfully', 'OK', { duration: 4000, verticalPosition: 'top', panelClass: ['snackBarSuccess'] });
        });
      });
    });
  }
}
