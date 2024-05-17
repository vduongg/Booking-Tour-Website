import { TestBed } from '@angular/core/testing';

import { TourTimeService } from './tour-time.service';

describe('TourTimeService', () => {
  let service: TourTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
