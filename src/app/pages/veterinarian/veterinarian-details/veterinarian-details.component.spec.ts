import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarianDetailsComponent } from './veterinarian-details.component';

describe('VeterinarianDetailsComponent', () => {
  let component: VeterinarianDetailsComponent;
  let fixture: ComponentFixture<VeterinarianDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinarianDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinarianDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
