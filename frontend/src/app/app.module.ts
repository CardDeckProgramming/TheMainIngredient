import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CreateComponent } from './components/create/create.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { CreateReviewComponent } from './components/create-review/create-review.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { ListComponent } from './components/list/list.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { 
  MatButtonModule,
  MatCardModule, 
  MatCheckboxModule,
  MatDividerModule, 
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,  
  MatInputModule,
  MatListModule,
  MatMenuModule, 
  MatOptionModule, 
  MatRadioModule,
  MatSelectModule, 
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule, 
  MatToolbarModule,
  MatTooltipModule
  } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReadReviewsComponent } from './components/read-reviews/read-reviews.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserViewRecipeComponent } from './components/user-view-recipe/user-view-recipe.component';
import { ViewComponent } from './components/view/view.component';
import { ViewReviewComponent } from './components/view-review/view-review.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ContactUsComponent,
    CreateComponent,
    CreateProfileComponent,
    EditProfileComponent,
    EditRecipeComponent,
    HomeComponent,
    ListComponent,
    MainNavComponent,
    SignInComponent,
    ViewComponent,
    SearchResultsComponent,
    UserViewComponent,
    CreateReviewComponent,
    UserViewRecipeComponent,
    ReadReviewsComponent,
    ViewReviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    MatTooltipModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule, 
    MatCardModule,
    MatCheckboxModule, 
    MatDividerModule,
    MatExpansionModule, 
    MatFormFieldModule, 
    MatGridListModule,
    MatIconModule, 
    MatInputModule, 
    MatListModule,
    MatMenuModule,
    MatOptionModule, 
    MatRadioModule,
    MatSelectModule, 
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule, 
    MatToolbarModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
