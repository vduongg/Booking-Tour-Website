import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourTypeComponent } from './tour-type.component';

describe('TourTypeComponent', () => {
  let component: TourTypeComponent;
  let fixture: ComponentFixture<TourTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
