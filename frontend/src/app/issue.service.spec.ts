import { TestBed } from '@angular/core/testing';

import { APIService } from './services/search.service';

describe('RecipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIService = TestBed.get(APIService);
    expect(service).toBeTruthy();
  });
});
