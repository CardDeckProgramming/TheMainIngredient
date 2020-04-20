import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Account } from '../../account.model';
import { Recipe } from '../../recipe.model';
import { Review } from '../../review.model';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

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
              private fb: FormBuilder, 
              private apiService: APIService, 
              private router: Router, 
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.userService.isAccountLoggedIn()) {
      this.searchForm= this.fb.group({
        search: new FormControl()
      });

      this.fetchRecipes();
      this.fetchFollows();
      this.fetchReviews();
    } else {
      this.router.navigate([`/home`]);
    }
  }

  /* 
  Gets all the recipes by calling the getRecipes() function from the apiService, 
  this will be changed later to get recipes based on the users account id
  */
  fetchRecipes(): void {
    if (this.userService.isAccountLoggedIn()) {
      this.apiService.getAccountRecipes(this.userService.getAccountId()).subscribe((data: Recipe[]) => {
        this.recipes = data;
      });
    } else {
      this.apiService.getRecipes().subscribe((data: Recipe[]) => {
        this.recipes = data;
      });
    }
  }

  fetchFollows(): void {
    this.apiService.getAccountFollows(this.userService.getAccountId()).subscribe((data: Account[]) => {
      this.follows = data;
    });
  }

  fetchReviews(): void {
    this.apiService.getAccountReviews(this.userService.getAccountId()).subscribe((data: Review[]) => {
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
    this.apiService.deleteRecipe(this.userService.getAccountId(), id).subscribe(() => {
      this.fetchRecipes();
    });
  }

  viewUserRecipes(userName, userId): void {
    this.router.navigate([`/user-view/${userName}/${userId}`]);
  }

  unfollowUser(followId): void {
    this.apiService.deleteFollow(this.userService.getAccountId(), followId).subscribe(() => {
      this.fetchFollows();
    });
  }

  viewReview(reviewId, recipeTitle): void {
    this.router.navigate([`/view-review/${reviewId}/${recipeTitle}`]);
  }

  deleteReview(reviewId): void {
    this.apiService.deleteReview(this.userService.getAccountId(), reviewId).subscribe(() => {
      this.fetchReviews();
    });
  }

  sortByType(type: string): void {
    this.apiService.getAccountRecipesByType(this.userService.getAccountId(), type).subscribe((data: Recipe[]) => {
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
      this.router.navigate([`/search-results/${search}`]);
    } else {
      this.snackBar.open('Please enter a name to use the search', 'Dismiss', { duration: 5000, verticalPosition: 'top', panelClass: ['snackBarError'] });
    }
  }

}
