import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinariansDashboardComponent } from './veterinarians-dashboard.component';

describe('VeterinariansDashboardComponent', () => {
  let component: VeterinariansDashboardComponent;
  let fixture: ComponentFixture<VeterinariansDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinariansDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinariansDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
