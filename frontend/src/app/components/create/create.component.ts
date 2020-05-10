import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private accountService: AccountService,
              private formBuilder: FormBuilder, 
              private recipeService: RecipeService, 
              private router: Router, 
              private userService: UserService) { }

  ngOnInit() {
    if (this.userService.isAccountLoggedIn()) { 
      this.createForm = this.formBuilder.group({
        author: [this.userService.getAccountFirst(), Validators.required],
        title: ['', Validators.required],
        type: ['', Validators.required],
        ingredients: this.formBuilder.array([
          this.addIngredientFormGroup()
        ]),
        steps: this.formBuilder.array([
          this.addStepFormGroup()
        ])
      });
    } else {
      this.router.navigate([`/list`]);
    }
  }

  addIngredientFormGroup() {
    return this.formBuilder.group({
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
    return this.formBuilder.group({
      description: ['', Validators.required]
    });
  }

  addStep(): void {
    (<FormArray>this.createForm.get('steps')).push(this.addStepFormGroup());
  }

  removeStep(stepIndex: number): void {
    (<FormArray>this.createForm.get('steps')).removeAt(stepIndex);
  }

  addRecipe() {
    this.recipeService.addRecipe(this.createForm.get('author').value, 
                              this.createForm.get('title').value, 
                              this.createForm.get('type').value, 
                              this.createForm.get('ingredients').value, 
                              this.createForm.get('steps').value).subscribe(response => {
      this.accountService.addRecipeToAcount(JSON.parse(JSON.stringify(response['recipeId']))).subscribe(response => {
        this.router.navigate(['/list']);
      });
    });
  }

}
