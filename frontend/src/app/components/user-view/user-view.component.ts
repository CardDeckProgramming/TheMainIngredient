import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Recipe } from '../../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  recipes: Recipe[];
  displayedColumns = ['title', 'type', 'actions'];
  searchForm: FormGroup;
  userName: string;
  userId: string;

  constructor(private userService: UserService, 
              private fb: FormBuilder, 
              private apiService: APIService, 
              private router: Router, 
              private route: ActivatedRoute, 
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.userService.isAccountLoggedIn()) {
      this.searchForm= this.fb.group({
        search: new FormControl()
      });

      this.route.params.subscribe(params => {
        this.userName = params.userName;
        this.userId = params.userId;
        this.fetchRecipes(params.userId);
      });
    } else {
      this.router.navigate([`/home`]);
    }
  }

  fetchRecipes(userId): void {
    this.apiService.getAccountRecipes(userId).subscribe((data: Recipe[]) => {
      this.recipes = data;
    });
  }

  search(searchInput): void {
    searchInput.trim();
    
    if (searchInput.length > 0) {
      var search: string = searchInput;
      this.router.navigate([`/search-results/${search}`]);
    } else {
      this.snackBar.open('Please enter a name to use the search', 'Dismiss', { duration: 5000, verticalPosition: 'top', panelClass: ['snackBarError'] });
    }
  } 

  viewRecipe(userName, userId, id): void {
    this.router.navigate([`/user-view-recipe/${userName}/${userId}/${id}`]);
  }

  reviewRecipe(userName, userId, recipeTitle, recipeId): void {
    this.router.navigate([`/create-review/${userName}/${userId}/${recipeId}/${recipeTitle}`]);
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

}
