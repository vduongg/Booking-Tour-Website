import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementNavbarComponent } from './management-navbar.component';

describe('ManagementNavbarComponent', () => {
  let component: ManagementNavbarComponent;
  let fixture: ComponentFixture<ManagementNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
