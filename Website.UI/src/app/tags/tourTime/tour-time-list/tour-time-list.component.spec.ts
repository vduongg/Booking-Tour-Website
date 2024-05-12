import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourTimeListComponent } from './tour-time-list.component';

describe('TourTimeListComponent', () => {
  let component: TourTimeListComponent;
  let fixture: ComponentFixture<TourTimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourTimeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
