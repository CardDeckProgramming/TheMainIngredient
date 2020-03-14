import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
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
  MatSelectModule, 
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule, 
  MatToolbarModule,
  MatTooltipModule
  } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ViewComponent } from './components/view/view.component';

//The path variables link to the corrisponding component
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'home', component: HomeComponent},
  {path: 'list', component: ListComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'view/:id', component: ViewComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ContactUsComponent,
    CreateComponent,
    EditComponent,
    HomeComponent,
    ListComponent,
    MainNavComponent,
    SignInComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    MatSelectModule, 
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule, 
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
