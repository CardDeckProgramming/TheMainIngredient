import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { RecipeService } from '../../services/recipe.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Account } from '../../models/account.model';
import { Recipe } from '../../models/recipe.model';
import { Review } from '../../models/review.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  recipes: Recipe[];
  displayedRecipeColumns = ['title', 'type', 'actions'];
  follows: Account[];
  displayedFollowColumns = ['follow', 'actions'];
  reviews: Review[];
  displayedReviewColumns = ['title', 'score', 'actions'];
  searchForm: FormGroup;

  constructor(private userService: UserService, 
              private formBuilder: FormBuilder, 
              private acountService: AccountService, 
              private recipeService: RecipeService, 
              private router: Router, 
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: new FormControl()
    });
    
    if (this.userService.isAccountLoggedIn()) {
      this.fetchRecipes();
      this.fetchFollows();
      this.fetchReviews();
    } else {
      this.router.navigate([`/home`]);
    }
  }

  fetchRecipes(): void {
    this.acountService.getRecipesByAccountId(this.userService.getAccountId()).subscribe((data: Recipe[]) => {
      this.recipes = data;
    });
  }

  fetchFollows(): void {
    this.acountService.getFollowsByAccountId(this.userService.getAccountId()).subscribe((data: Account[]) => {
      this.follows = data;
    });
  }

  fetchReviews(): void {
    this.acountService.getReviewsByAccountId(this.userService.getAccountId()).subscribe((data: Review[]) => {
      this.reviews = data;
    });
  }

  viewRecipe(id): void {
    this.router.navigate([`/view/${id}`]);
  }

  //Using the routes defined in the app.module.ts this will take us to the editComponent for the user to edit the recipe they sleected
  editRecipe(id): void {
    this.router.navigate([`/edit-recipe/${id}`]);
  }

  //This currently deletes recipes, the naming will be fixed later...
  deleteRecipe(id): void {
    this.acountService.deleteRecipeFromAccount(this.userService.getAccountId(), id).subscribe(() => {
      this.fetchRecipes();
    });
  }

  viewUserRecipes(userName, userId): void {
    this.router.navigate([`/user-view/${userName}/${userId}`]);
  }

  unfollowUser(followId): void {
    this.acountService.deleteFollowFromAccount(this.userService.getAccountId(), followId).subscribe(() => {
      this.fetchFollows();
    });
  }

  viewReview(reviewId, recipeTitle): void {
    this.router.navigate([`/view-review/${reviewId}/${recipeTitle}`]);
  }

  deleteReview(reviewId): void {
    this.acountService.deleteReviewFromAccount(this.userService.getAccountId(), reviewId).subscribe(() => {
      this.fetchReviews();
    });
  }

  sortByType(type: string): void {
    this.acountService.getAccountRecipesByType(this.userService.getAccountId(), type).subscribe((data: Recipe[]) => {
      if (data.length == 0) {
        this.snackBar.open('There are no ' + type + ' Recipes to display', 'Dismiss', { duration: 5000, verticalPosition: 'top', panelClass: ['snackBarError'] });
      } else {
        this.recipes = data;
      }
    })
  }

  search(): void {
    let searchInput: string = this.searchForm.get('search').value.trim();
    searchInput.trim();
    
    if (searchInput.length > 0) {
      var search: string = searchInput;
      this.router.navigate([`/search/${search}`]);
    } else {
      this.snackBar.open('Please enter a name to use the search', 'Dismiss', { duration: 5000, verticalPosition: 'top', panelClass: ['snackBarError'] });
    }
  }

}
