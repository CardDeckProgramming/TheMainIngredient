import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  recipes: Recipe[];
  displayedColumns = ['author', 'title', 'type', 'actions'];

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.fetchIssues();
  }

  fetchIssues() {
    this.recipeService.getRecipes().subscribe((data: Recipe[]) => {
      this.recipes = data;
      console.log('Data Requested...');
      console.log(this.recipes);
    });
  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) {
    this.recipeService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }

}
