import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../../api.service';
import { Recipe } from '../../recipe.model';
import { UserService } from 'src/app/user.service';
import { Volumes } from 'src/app/volume';
import { Weights } from 'src/app/weight';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {

  id: string;
  recipe: Recipe;
  sortedIngredients: Array<string> = [];
  results: Array<string> = [];
  dropDown: Array<string> = [];
  VOLUMES = 'Volumes';
  WEIGHTS = 'Weights';

  volumeCalculations: Array<any> = [
                                    //from Teaspoon to...
                                    {from: 'tsp', to: 'tsp', value: 1}, 
                                    {from: 'tsp', to: 'Tbsp', value: 0.333333},
                                    {from: 'tsp', to: 'oz', value: 0.166667},
                                    {from: 'tsp', to: 'c', value: 0.0205372},
                                    {from: 'tsp', to: 'pt', value: 0.0104167},
                                    {from: 'tsp', to: 'qt', value: 0.00520833},
                                    {from: 'tsp', to: 'gal', value: 0.00130208},
                                    {from: 'tsp', to: 'ltr', value: 0.00492892},
                                    {from: 'tsp', to: 'ml', value: 4.92892},
                          
                                    //from Tablespoon to...
                                    {from: 'Tbsp', to: 'Tbsp', value: 1}, 
                                    {from: 'Tbsp', to: 'tsp', value: 3},
                                    {from: 'Tbsp', to: 'oz', value: 0.5},
                                    {from: 'Tbsp', to: 'c', value: 0.0625},
                                    {from: 'Tbsp', to: 'pt', value: 0.03125},
                                    {from: 'Tbsp', to: 'qt', value: 0.015625},
                                    {from: 'Tbsp', to: 'gal', value: 0.00390625},
                                    {from: 'Tbsp', to: 'ltr', value: 0.0147868},
                                    {from: 'Tbsp', to: 'ml', value: 14.7868},

                                    //from Ounce to...
                                    {from: 'oz', to: 'oz', value: 1}, 
                                    {from: 'oz', to: 'Tbsp', value: 2},
                                    {from: 'oz', to: 'tsp', value: 6},
                                    {from: 'oz', to: 'c', value: 0.123223},
                                    {from: 'oz', to: 'pt', value: 0.0625},
                                    {from: 'oz', to: 'qt', value: 0.03125},
                                    {from: 'oz', to: 'gal', value: 0.0078125},
                                    {from: 'oz', to: 'ltr', value: 0.0295735},
                                    {from: 'oz', to: 'ml', value: 29.573500000001367},

                                    //from Cup to...
                                    {from: 'c', to: 'c', value: 1}, 
                                    {from: 'c', to: 'Tbsp', value: 16},
                                    {from: 'c', to: 'oz', value: 8},
                                    {from: 'c', to: 'tsp', value: 48},
                                    {from: 'c', to: 'pt', value: 0.5},
                                    {from: 'c', to: 'qt', value: 0.25},
                                    {from: 'c', to: 'gal', value: 0.0625},
                                    {from: 'c', to: 'ltr', value: 0.236588},
                                    {from: 'c', to: 'ml', value: 236.588},

                                    //from Pint to...
                                    {from: 'pt', to: 'tsp', value: 1}, 
                                    {from: 'pt', to: 'Tbsp', value: 0.333333},
                                    {from: 'pt', to: 'oz', value: 0.166667},
                                    {from: 'pt', to: 'c', value: 0.0205372},
                                    {from: 'pt', to: 'pt', value: 0.0104167},
                                    {from: 'pt', to: 'qt', value: 0.00520833},
                                    {from: 'pt', to: 'gal', value: 0.00130208},
                                    {from: 'pt', to: 'ltr', value: 0.00492892},
                                    {from: 'pt', to: 'ml', value: 4.92892},

                                    //from Quart to...
                                    {from: 'qt', to: 'qt', value: 1}, 
                                    {from: 'qt', to: 'Tbsp', value: 64},
                                    {from: 'qt', to: 'oz', value: 32},
                                    {from: 'qt', to: 'c', value: 4},
                                    {from: 'qt', to: 'pt', value: 2},
                                    {from: 'qt', to: 'tsp', value: 192},
                                    {from: 'qt', to: 'gal', value: 0.25},
                                    {from: 'qt', to: 'ltr', value: 0.946353},
                                    {from: 'qt', to: 'ml', value: 946.353},

                                    //from Gallon to...
                                    {from: 'gal', to: 'gal', value: 1}, 
                                    {from: 'gal', to: 'Tbsp', value: 256},
                                    {from: 'gal', to: 'oz', value: 128},
                                    {from: 'gal', to: 'c', value: 16},
                                    {from: 'gal', to: 'pt', value: 8},
                                    {from: 'gal', to: 'qt', value: 4},
                                    {from: 'gal', to: 'tsp', value: 768},
                                    {from: 'gal', to: 'ltr', value: 3.78541},
                                    {from: 'gal', to: 'ml', value: 3785.40999993543},

                                    //from Liter to...
                                    {from: 'ltr', to: 'ltr', value: 1}, 
                                    {from: 'ltr', to: 'Tbsp', value: 67.628},
                                    {from: 'ltr', to: 'oz', value: 33.814},
                                    {from: 'ltr', to: 'c', value: 4.22675},
                                    {from: 'ltr', to: 'pt', value: 2.11338},
                                    {from: 'ltr', to: 'qt', value: 1.05669},
                                    {from: 'ltr', to: 'gal', value: 0.264172},
                                    {from: 'ltr', to: 'tsp', value: 202.884},
                                    {from: 'ltr', to: 'ml', value: 1000},

                                    //from Milliliter to...
                                    {from: 'ml', to: 'ml', value: 1}, 
                                    {from: 'ml', to: 'Tbsp', value: 0.067628},
                                    {from: 'ml', to: 'oz', value: 0.033814},
                                    {from: 'ml', to: 'c', value: 0.00422675},
                                    {from: 'ml', to: 'pt', value: 0.00211338},
                                    {from: 'ml', to: 'qt', value: 0.00105669},
                                    {from: 'ml', to: 'gal', value: 0.000264172},
                                    {from: 'ml', to: 'ltr', value: 0.001},
                                    {from: 'ml', to: 'tsp', value: 0.202884}  
                                  ];

  weightCalculations: Array<any> = [
                                    //from Ounce to...
                                    {from: 'oz', to: 'oz', value: 1}, 
                                    {from: 'oz', to: 'lb', value: 0.0625},
                                    {from: 'oz', to: 'g', value: 28.3495},
                                    {from: 'oz', to: 'kg', value: 0.0283495},

                                    //from Pound to...
                                    {from: 'lb', to: 'lb', value: 1}, 
                                    {from: 'lb', to: 'oz', value: 16},
                                    {from: 'lb', to: 'g', value: 453.592},
                                    {from: 'lb', to: 'kg', value: 0.453592},

                                    //from Gram to...
                                    {from: 'g', to: 'g', value: 1}, 
                                    {from: 'g', to: 'lb', value: 0.00220462},
                                    {from: 'g', to: 'oz', value: 0.035274},
                                    {from: 'g', to: 'kg', value: 0.001},

                                    //from Kilogram to...
                                    {from: 'kg', to: 'kg', value: 1}, 
                                    {from: 'kg', to: 'lb', value: 2.20462},
                                    {from: 'kg', to: 'g', value: 1000},
                                    {from: 'kg', to: 'oz', value: 35.274}
                                  ];

  constructor(private apiService: APIService, 
              private router: Router, 
              private route: ActivatedRoute, 
              private userService: UserService) { }

  ngOnInit() {
    if (this.userService.isAccountLoggedIn()) {
      this.route.params.subscribe(params => {
        this.id = params.id;

        this.apiService.getRecipeById(this.id).subscribe((data: Recipe) => {

          for (let i = 0; i < data.ingredients.length; i++) {
            this.results.push('');
            this.dropDown.push('');
          }

          this.recipe = data;
          this.sortedIngredients = this.recipe.ingredients.slice();
        });
      });

    } else {
      this.router.navigate([`/list`]);
    }
  }

  convertAllMeasurements(measurmentType, toMeasurement) {
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      let currentIngredient = this.recipe.ingredients[i];
      if (measurmentType == this.VOLUMES && Volumes[currentIngredient['measurement']]) {
        this.volumeCalculations.forEach(conversion => {
          this.setMeasurement(conversion['from'], conversion['to'], conversion['value'], currentIngredient['measurement'], toMeasurement, currentIngredient['amount'], i);
          this.dropDown[i] = '-1';
        });
      } else if (measurmentType == this.WEIGHTS && Weights[currentIngredient['measurement']]) {
        this.weightCalculations.forEach(conversion => {
          this.setMeasurement(conversion['from'], conversion['to'], conversion['value'], currentIngredient['measurement'], toMeasurement, currentIngredient['amount'], i);
          this.dropDown[i] = '-1';
        });
      }
    }
  }

  convertMeasurement(amount, fromMeasurement, inputId, toMeasurement) {
    if (Volumes[fromMeasurement] && Volumes[toMeasurement]) {
      this.volumeCalculations.forEach(conversion => {
        this.setMeasurement(conversion['from'], conversion['to'], conversion['value'], fromMeasurement, toMeasurement, amount, inputId);
      });
    } else if (Weights[fromMeasurement] && Weights[toMeasurement]) {
      this.weightCalculations.forEach(conversion => {
        this.setMeasurement(conversion['from'], conversion['to'], conversion['value'], fromMeasurement, toMeasurement, amount, inputId);
      });
    } else {
      this.results[inputId] = 'Invalid Calculation';
    }
  }

  setMeasurement(conversionFrom, conversionTo, conversionValue, fromMeasurement, toMeasurement, amount, inputId) {
    if (conversionFrom == fromMeasurement && conversionTo == toMeasurement) {
      let result = (amount * conversionValue).toFixed(2);
      this.results[inputId] = String(result) + conversionTo;
    }
  } 
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sortedIngredients, event.previousIndex, event.currentIndex);
  }

  sortData(sort: Sort) {
    const data = this.recipe.ingredients.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedIngredients = data;
      return;
    }

    this.sortedIngredients = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      let aCompare: any;
      let bCompare: any; 
      switch (sort.active) {
        case 'ingredient':
          aCompare = a['ingredient'];
          bCompare = b['ingredient'];
          return this.compare(aCompare, bCompare, isAsc);
        case 'amount': 
          aCompare = a['amount'];
          bCompare = b['amount'];
          return this.compare(aCompare, bCompare, isAsc);
        case 'measurement': 
          aCompare = a['measurement'];
          bCompare = b['measurement'];
          return this.compare(aCompare, bCompare, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
