import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVeterinarianComponent } from './create-veterinarian.component';

describe('CreateVeterinarianComponent', () => {
  let component: CreateVeterinarianComponent;
  let fixture: ComponentFixture<CreateVeterinarianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVeterinarianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVeterinarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
