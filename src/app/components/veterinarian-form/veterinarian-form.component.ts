import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressFieldsetComponent } from '../address-fieldset/address-fieldset.component';
import { faker } from '@faker-js/faker';
import { Veterinarian } from '../../models/veterinarian.model';

@Component({
  selector: 'app-veterinarian-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddressFieldsetComponent],
  templateUrl: './veterinarian-form.component.html',
  styleUrl: './veterinarian-form.component.css'
})
export class VeterinarianFormComponent {
  @Input() disabled = false
  @Input() default?: Veterinarian
  @Output() onSubmit = new EventEmitter<Veterinarian>()

  form!: FormGroup
  addressForm!: FormGroup
  placeholders!: typeof this.form.value
  submitted = false

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.default?.name ?? '', [Validators.required]),
      email: new FormControl(this.default?.email ?? '', [Validators.required, Validators.email]),
      phone: new FormControl(this.default?.phone ?? '', [Validators.required]),
    })

    this.placeholders = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: {
        postalCode: faker.location.zipCode(),
        street: faker.location.street(),
        number: faker.number.int({ min: 1, max: 10000 }),
        city: faker.location.city()
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.disabled ? this.disableForms() : this.enableForms()
    if (changes['default']?.isFirstChange()) {
      this.form?.reset(this.default)
      this.addressForm?.reset(this.default?.address)
    }
  }

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
