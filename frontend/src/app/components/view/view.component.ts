import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../../api.service';
import { Recipe } from '../../recipe.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id: String;
  recipe: Recipe;

  constructor(private apiService: APIService, private router: Router, private route: ActivatedRoute, private userService: UserService) { 
    
  }

  ngOnInit() {
    if (this.userService.isAccountLoggedIn()) {
      this.route.params.subscribe(params => {
        this.id = params.id;
        this.apiService.getRecipeById(this.id).subscribe((data: Recipe) => {
          this.recipe = data;
        });
      });
    } else {
      this.router.navigate([`/list`]);
    }
  }

  fetchRecipe() {
    
  }
}
