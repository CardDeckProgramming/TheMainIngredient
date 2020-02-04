import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get(`${this.uri}/recipes`);
  }

  getIssueById(id) {
    return this.http.get(`${this.uri}/recipes/${id}`);
  }

  addRecipe(author, title, type, ingredients, steps) {
    const recipe = {
      author: author,
      title: title,
      type: type,
      ingredients: ingredients,
      steps: steps
    }
    console.log(recipe);
    return this.http.post(`${this.uri}/recipes/add`, recipe);
  }

  updateIssue(id, title, responsible, description, severity, status) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    };
    return this.http.post(`${this.uri}/recipes/update/${id}`, issue);
  }

  deleteIssue(id) {
    return this.http.get(`${this.uri}/recipes/delete/${id}`);
  }
}
