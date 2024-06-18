import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourStatisticComponent } from './tour-statistic.component';

describe('TourStatisticComponent', () => {
  let component: TourStatisticComponent;
  let fixture: ComponentFixture<TourStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
