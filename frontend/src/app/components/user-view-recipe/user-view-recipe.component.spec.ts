import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewRecipeComponent } from './user-view-recipe.component';

describe('UserViewRecipeComponent', () => {
  let component: UserViewRecipeComponent;
  let fixture: ComponentFixture<UserViewRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
