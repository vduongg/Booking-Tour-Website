import { TestBed } from '@angular/core/testing';

import { FilterTourService } from './filter-tour.service';

describe('FilterTourService', () => {
  let service: FilterTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
