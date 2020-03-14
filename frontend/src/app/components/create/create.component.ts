import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../../api.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private apiService: APIService, private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    if (this.userService.isAccountLoggedIn()) { 
      this.createForm = this.fb.group({
        author: ['', Validators.required],
        title: ['', Validators.required],
        type: ['', Validators.required],
        ingredients: this.fb.array([
          this.addIngredientFormGroup()
        ]),
        steps: this.fb.array([
          this.addStepFormGroup()
        ])
      });
    } else {
      this.router.navigate([`/list`]);
    }
  }

  addIngredientFormGroup() {
    return this.fb.group({
      ingredient: ['', Validators.required],
      amount: ['', Validators.required],
      measurement: ['', Validators.required]
    });
  }

  addIngredient() {
    (<FormArray>this.createForm.get('ingredients')).push(this.addIngredientFormGroup());
  }

  removeIngredient(ingredientIndex: number) {
    (<FormArray>this.createForm.get('ingredients')).removeAt(ingredientIndex);
  }

  addStepFormGroup(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required]
    });
  }

  addStep(): void {
    (<FormArray>this.createForm.get('steps')).push(this.addStepFormGroup());
  }

  removeStep(stepIndex: number): void {
    (<FormArray>this.createForm.get('steps')).removeAt(stepIndex);
  }

  saveRecipe() {
    this.apiService.addRecipe(this.createForm.get('author').value, this.createForm.get('title').value, this.createForm.get('type').value, this.createForm.get('ingredients').value, this.createForm.get('steps').value).subscribe(response => {
      this.apiService.addAccountRecipeId(JSON.parse(JSON.stringify(response['recipeId']))).subscribe(response => {
        this.router.navigate(['/list']);
      });
    });
  }

}
