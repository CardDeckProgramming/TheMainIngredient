import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { APIService } from '../../api.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  recipe: any = {};
  updateForm: FormGroup;

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
  
          this.updateForm.get('author').setValue(this.recipe.author);
          this.updateForm.get('title').setValue(this.recipe.title);
          this.updateForm.get('type').setValue(this.recipe.type);
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
    this.updateForm = this.fb.group({
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
    (<FormArray>this.updateForm.get('ingredients')).push(this.addIngredientFormGroup());
  }

  removeIngredient(ingredientIndex: number) {
    (<FormArray>this.updateForm.get('ingredients')).removeAt(ingredientIndex);
  }

  setIngredient(ingredient) {
    (<FormArray>this.updateForm.get('ingredients')).push(this.fb.group({
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
    (<FormArray>this.updateForm.get('steps')).push(this.addStepFormGroup());
  }

  removeStep(stepIndex: number): void {
    (<FormArray>this.updateForm.get('steps')).removeAt(stepIndex);
  }

  setStep(step) {
    (<FormArray>this.updateForm.get('steps')).push(this.fb.group({
      description: [step.description, Validators.required]
    }));
  }

  updateRecipe() {
    this.apiService.updateRecipe(this.id, this.updateForm.get('author').value, this.updateForm.get('title').value, this.updateForm.get('type').value, this.updateForm.get('ingredients').value, this.updateForm.get('steps').value).subscribe(response => {
      this.router.navigate(['/list']);
      this.snackBar.open('Recipe "' + JSON.parse(JSON.stringify(response['title'])) + '" updated successfully', 'OK', { duration: 4000, verticalPosition: 'top', panelClass: ['snackBarSuccess'] });
    });
  }

}
