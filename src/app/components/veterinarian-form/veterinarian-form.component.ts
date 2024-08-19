import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddressFieldsetComponent } from '../address-fieldset/address-fieldset.component';
import { faker } from '@faker-js/faker';
import { Veterinarian } from '../../models/veterinarian.model';

@Component({
  selector: 'app-veterinarian-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AddressFieldsetComponent],
  templateUrl: './veterinarian-form.component.html',
  styleUrl: './veterinarian-form.component.css'
})
export class VeterinarianFormComponent {
  @Output() onSubmit = new EventEmitter<Veterinarian>()

  form!: FormGroup
  addressForm!: FormGroup
  placeholders!: typeof this.form.value
  submitted = false

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
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

  setAddressFormGroup(formGroup: FormGroup) {
    this.addressForm = formGroup
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
