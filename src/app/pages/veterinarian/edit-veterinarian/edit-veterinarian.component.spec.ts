import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVeterinarianComponent } from './edit-veterinarian.component';

describe('EditVeterinarianComponent', () => {
  let component: EditVeterinarianComponent;
  let fixture: ComponentFixture<EditVeterinarianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVeterinarianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVeterinarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
