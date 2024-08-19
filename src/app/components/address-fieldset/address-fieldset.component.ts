import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faker } from '@faker-js/faker';
import { countries } from 'app/shared/countries';
import { Address } from 'app/models/address.model';

@Component({
  selector: 'app-address-fieldset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-fieldset.component.html',
  styleUrl: './address-fieldset.component.css'
})
export class AddressFieldsetComponent {
  @Output() onFormGroupChange = new EventEmitter<FormGroup>()
  @Input()
  set default(address: Address) {
    this.form.patchValue(address)
    this.placeholders = {
      ...address,
      number: (address.number ?? '').toString()
    }
  }

  form = this.generateForm()
  placeholders = this.generateFakePlaceholders()
  countries = countries

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.onFormGroupChange.emit(this.form)
  }

  generateForm() {
    return this.fb.nonNullable.group({
      country: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: [NaN],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]]
    })
  }

  generateFakePlaceholders() {
    return {
      postalCode: faker.location.zipCode(),
      street: faker.location.street(),
      number: faker.number.int({ min: 1, max: 10000 }).toString(),
      city: faker.location.city()
    }
  }
}
