import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadReviewsComponent } from './read-reviews.component';

describe('ReadReviewsComponent', () => {
  let component: ReadReviewsComponent;
  let fixture: ComponentFixture<ReadReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
