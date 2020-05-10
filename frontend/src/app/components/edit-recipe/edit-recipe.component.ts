import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  id: String;
  recipe: any = {};
  updateRecipeForm: FormGroup;

  constructor(private recipeService: RecipeService,
              private formBuilder: FormBuilder, 
              private router: Router, 
              private route: ActivatedRoute, 
              private snackBar: MatSnackBar,
              private userService: UserService) { 
        
    this.createForm();
  }

  ngOnInit() {
    if (this.userService.isAccountLoggedIn()) {
      this.route.params.subscribe(params => {
        this.id = params.id;
        this.recipeService.getRecipeById(this.id).subscribe(res => {
          this.recipe = res;
  
          this.updateRecipeForm.get('author').setValue(this.recipe.author);
          this.updateRecipeForm.get('title').setValue(this.recipe.title);
          this.updateRecipeForm.get('type').setValue(this.recipe.type);
          for(let ingredient of this.recipe.ingredients) {
            this.setIngredient(ingredient);
          }
          for(let step of this.recipe.steps) {
            this.setStep(step);
          }
        });
      });
    } else {
      this.router.navigate([`/home`]);
    }
  }

  createForm() {
    this.updateRecipeForm = this.formBuilder.group({
      author: [''],
      title: ['', Validators.required],
      type: ['', Validators.required],
      ingredients: this.formBuilder.array([]),
      steps: this.formBuilder.array([])
    });
  }

  addIngredientFormGroup() {
    return this.formBuilder.group({
      ingredient: ['', Validators.required],
      amount: ['', Validators.required],
      measurement: ['', Validators.required]
    });
  }

  addIngredient() {
    (<FormArray>this.updateRecipeForm.get('ingredients')).push(this.addIngredientFormGroup());
  }

  removeIngredient(ingredientIndex: number) {
    (<FormArray>this.updateRecipeForm.get('ingredients')).removeAt(ingredientIndex);
  }

  setIngredient(ingredient) {
    (<FormArray>this.updateRecipeForm.get('ingredients')).push(this.formBuilder.group({
      ingredient: [ingredient.ingredient, Validators.required],
      amount: [ingredient.amount, Validators.required],
      measurement: [ingredient.measurement, Validators.required]
    }));
  }

  addStepFormGroup(): FormGroup {
    return this.formBuilder.group({
      description: ['', Validators.required]
    });
  }

  addStep(): void {
    (<FormArray>this.updateRecipeForm.get('steps')).push(this.addStepFormGroup());
  }

  removeStep(stepIndex: number): void {
    (<FormArray>this.updateRecipeForm.get('steps')).removeAt(stepIndex);
  }

  setStep(step) {
    (<FormArray>this.updateRecipeForm.get('steps')).push(this.formBuilder.group({
      description: [step.description, Validators.required]
    }));
  }

  updateRecipe() {
    this.recipeService.updateRecipe(this.id, this.updateRecipeForm.get('author').value, 
                                 this.updateRecipeForm.get('title').value, 
                                 this.updateRecipeForm.get('type').value, 
                                 this.updateRecipeForm.get('ingredients').value, 
                                 this.updateRecipeForm.get('steps').value).subscribe(response => {
      this.router.navigate(['/list']);
      this.snackBar.open('Recipe "' + JSON.parse(JSON.stringify(response['title'])) + '" updated successfully', 'OK', { duration: 4000, verticalPosition: 'top', panelClass: ['snackBarSuccess'] });
    });
  }

}
