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
  private _disabled = false

  @Output() onSubmit = new EventEmitter<Veterinarian>()
  @Input()
  set disabled(value: boolean) {
    this._disabled = value
    this.onDisableUpdated()
  }
  @Input()
  set default(veterinarian: Veterinarian) {
    this._default = veterinarian
    this.placeholders = veterinarian
    this.updateForm()
  }

  get disabled() { return this._disabled }
  get default() { return this._default }

  private addressForm?: AddressFieldsetComponent['form']
  form = this.generateForm()
  placeholders = this.generateFakePlaceholders()
  submitted = false

  constructor(private fb: FormBuilder) {}

  setAddressFormGroup(formGroup: FormGroup) {
    this.addressForm = formGroup
    this.updateForm()
  }

  onDisableUpdated() {
    this.disabled ? this.form.disable() : this.form.enable()
  }

  updateForm() {
    this.form = this.generateForm()
    this.onDisableUpdated()
  }

  private generateForm() {
    return this.fb.nonNullable.group({
      name:  [this._default?.name  ?? '', [Validators.required]],
      email: [this._default?.email ?? '', [Validators.required, Validators.email]],
      phone: [this._default?.phone ?? '', [Validators.required]],
      address: this.addressForm
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
  }

  submit() {
    this.submitted = true
    if (!this.form.valid) {
      return
    }

    const veterinarian = this.form.getRawValue()
    this.onSubmit.emit(veterinarian)
  }
}
