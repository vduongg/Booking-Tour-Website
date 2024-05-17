import { TestBed } from '@angular/core/testing';

import { TourTypeService } from './tour-type.service';

describe('TourTypeService', () => {
  let service: TourTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
