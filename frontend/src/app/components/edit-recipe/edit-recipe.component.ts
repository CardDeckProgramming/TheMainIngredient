import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { APIService } from '../../api.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  id: String;
  recipe: any = {};
  updateRecipeForm: FormGroup;

  constructor(private apiService: APIService, 
              private fb: FormBuilder, 
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
        this.apiService.getRecipeById(this.id).subscribe(res => {
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
    this.updateRecipeForm = this.fb.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      type: ['', Validators.required],
      ingredients: this.fb.array([]),
      steps: this.fb.array([])
    });
  }

  addIngredientFormGroup() {
    return this.fb.group({
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
    (<FormArray>this.updateRecipeForm.get('ingredients')).push(this.fb.group({
      ingredient: [ingredient.ingredient, Validators.required],
      amount: [ingredient.amount, Validators.required],
      measurement: [ingredient.measurement, Validators.required]
    }));
  }

  addStepFormGroup(): FormGroup {
    return this.fb.group({
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
    (<FormArray>this.updateRecipeForm.get('steps')).push(this.fb.group({
      description: [step.description, Validators.required]
    }));
  }

  updateRecipe() {
    this.apiService.updateRecipe(this.id, this.updateRecipeForm.get('author').value, 
                                 this.updateRecipeForm.get('title').value, 
                                 this.updateRecipeForm.get('type').value, 
                                 this.updateRecipeForm.get('ingredients').value, 
                                 this.updateRecipeForm.get('steps').value).subscribe(response => {
      this.router.navigate(['/list']);
      this.snackBar.open('Recipe "' + JSON.parse(JSON.stringify(response['title'])) + '" updated successfully', 'OK', { duration: 4000, verticalPosition: 'top', panelClass: ['snackBarSuccess'] });
    });
  }

}
