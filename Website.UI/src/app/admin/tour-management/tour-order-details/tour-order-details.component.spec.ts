import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourOrderDetailsComponent } from './tour-order-details.component';

describe('TourOrderDetailsComponent', () => {
  let component: TourOrderDetailsComponent;
  let fixture: ComponentFixture<TourOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourOrderDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
