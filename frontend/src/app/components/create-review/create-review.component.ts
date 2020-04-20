import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

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
              private apiService: APIService, 
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
    this.apiService.addReview(this.recipeTitle,
                              this.userName.replace('_', ' '),
                              this.reviewForm.get('score').value, 
                              this.reviewForm.get('review').value).subscribe((response) => {
      this.apiService.addAccountReviewId(JSON.parse(JSON.stringify(response['reviewId']))).subscribe(response => {
        this.apiService.addRecipeReviewId(this.recipeId, JSON.parse(JSON.stringify(response['reviewId']))).subscribe(response => {
          this.router.navigate(['/user-view/' + this.userName + '/' + this.userId]);
          this.snackBar.open('Review submitted successfully', 'OK', { duration: 4000, verticalPosition: 'top', panelClass: ['snackBarSuccess'] });
        });
      });
    });
  }
}
