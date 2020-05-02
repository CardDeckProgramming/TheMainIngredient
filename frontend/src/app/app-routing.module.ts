import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CreateComponent } from './components/create/create.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { CreateReviewComponent } from './components/create-review/create-review.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserViewRecipeComponent } from './components/user-view-recipe/user-view-recipe.component';
import { ViewComponent } from './components/view/view.component';
import { ViewReviewComponent } from './components/view-review/view-review.component';
import { ReadReviewsComponent } from './components/read-reviews/read-reviews.component';

//The path variables link to the corrisponding component
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'create', component: CreateComponent},
  {path: 'create-profile/:email/:password', component: CreateProfileComponent},
  {path: 'create-review/:userName/:userId/:recipeId/:recipeTitle', component: CreateReviewComponent },
  {path: 'edit-profile/:id', component: EditProfileComponent},
  {path: 'edit-recipe/:id', component: EditRecipeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'list', component: ListComponent},
  {path: 'search-results/:search', component: SearchResultsComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'user-view/:userName/:userId', component: UserViewComponent},
  {path: 'user-view-recipe/:userName/:userId/:id', component: UserViewRecipeComponent},
  {path: 'view/:id', component: ViewComponent},
  {path: 'view-review/:reviewId/:recipeTitle', component: ViewReviewComponent },
  {path: 'view-reviews/:userName/:userId/:recipeId/:recipeTitle', component: ReadReviewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
