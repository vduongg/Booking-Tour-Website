import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPolicyComponent } from './tour-policy.component';

describe('TourPolicyComponent', () => {
  let component: TourPolicyComponent;
  let fixture: ComponentFixture<TourPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
