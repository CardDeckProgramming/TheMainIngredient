import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Review } from '../../models/review.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-read-reviews',
  templateUrl: './read-reviews.component.html',
  styleUrls: ['./read-reviews.component.css']
})
export class ReadReviewsComponent implements OnInit {

  userName: string;
  userId: string;
  recipeId: string;
  recipeTitle: string;
  reviews: Review[];
  recipeBy: any;

  constructor(private apiService: RecipeService, 
              private router: Router, 
              private route: ActivatedRoute, 
              private userService: UserService) { }

  ngOnInit(): void {
    if (this.userService.isAccountLoggedIn()) {
      this.route.params.subscribe(params => {
        this.userName = params.userName;
        this.userId = params.userId;
        this.recipeId = params.recipeId;
        this.recipeTitle = params.recipeTitle;

        this.apiService.getReviewsByRecipeId(this.recipeId).subscribe((data: Review[]) => {
          this.reviews = data;
          this.recipeBy = this.reviews[0]['recipeBy'];
        });
      });
    } else {
      this.router.navigate([`/list`]);
    }
  }

}
