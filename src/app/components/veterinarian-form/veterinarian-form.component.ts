import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faker } from '@faker-js/faker';
import { emptyVeterinarian, Veterinarian } from 'app/models/veterinarian.model';
import { AddressFieldsetComponent } from '../address-fieldset/address-fieldset.component';

@Component({
  selector: 'app-veterinarian-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddressFieldsetComponent],
  templateUrl: './veterinarian-form.component.html',
  styleUrl: './veterinarian-form.component.css'
})
export class VeterinarianFormComponent {
  private _default = emptyVeterinarian

  @Output() onSubmit = new EventEmitter<Veterinarian>()
  @Input() disabled = false
  @Input()
  set default(veterinarian: Veterinarian) {
    this.form = this.generateForm(veterinarian)
    this._default = veterinarian
    this.placeholders = veterinarian
  }

  get default() { return this._default }

  private addressForm!: FormGroup
  form = this.generateForm()
  placeholders = this.generateFakePlaceholders()
  submitted = false

  constructor(private fb: FormBuilder) {}

  setAddressFormGroup(formGroup: FormGroup) {
    this.addressForm = formGroup
  }

  enableForms() {
    this.form?.enable()
    this.addressForm?.enable()
  }

  disableForms() {
    this.form?.disable()
    this.addressForm?.disable()
  }

  generateForm(defaults?: Partial<Veterinarian>) {
    return this.fb.nonNullable.group({
      name:  [defaults?.name  ?? '', [Validators.required]],
      email: [defaults?.email ?? '', [Validators.required, Validators.email]],
      phone: [defaults?.phone ?? '', [Validators.required]],
    })
  }

  generateFakePlaceholders() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number()
    }
  }

  reset() {
    this.submitted = false
    this.form.reset()
    this.addressForm.reset()
  }

  submit() {
    this.submitted = true
    if (!this.form.valid || !this.addressForm.valid) {
      return
    }

    const veterinarian = {
      address: this.addressForm.getRawValue(),
      ...this.form.getRawValue()
    }

    this.onSubmit.emit(veterinarian)
  }
}
