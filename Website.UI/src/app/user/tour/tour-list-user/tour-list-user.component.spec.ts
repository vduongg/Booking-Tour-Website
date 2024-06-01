import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourListUserComponent } from './tour-list-user.component';

describe('TourListUserComponent', () => {
  let component: TourListUserComponent;
  let fixture: ComponentFixture<TourListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourListUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
