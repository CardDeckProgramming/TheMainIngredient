import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Recipe } from '../../recipe.model';
import { UserService } from '../../user.service';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  recipes: Recipe[];
  displayedColumns = ['author', 'title', 'type', 'actions'];

  constructor(private userService: UserService, private apiService: APIService, private router: Router) { }

  ngOnInit() {
    if (this.userService.isAccountLoggedIn()) {
      this.fetchRecipes();
    } else {
      this.router.navigate([`/home`]);
    }
  }

  /* 
  Gets all the recipes by calling the getRecipes() function from the apiService, 
  this will be changed later to get recipes based on the users account id
  */
  fetchRecipes() {
    if (this.userService.isAccountLoggedIn()) {
      this.apiService.getAccountRecipes().subscribe((data: Recipe[]) => {
        this.recipes = data;
      });
    } else {
      this.apiService.getRecipes().subscribe((data: Recipe[]) => {
        this.recipes = data;
      });
    }
  }

  viewRecipe(id) {
    this.router.navigate([`/view/${id}`]);
  }

  //Using the routes defined in the app.module.ts this will take us to the editComponent for the user to edit the recipe they sleected
  editRecipe(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  //This currently deletes recipes, the naming will be fixed later...
  deleteRecipe(id) {
    this.apiService.deleteIssue(id).subscribe(() => {
      this.fetchRecipes();
    });
  }

}
