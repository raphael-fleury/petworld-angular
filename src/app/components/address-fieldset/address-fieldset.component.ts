import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faker } from '@faker-js/faker';
import { Country } from '../../models/country.model';
import { countries } from '../../shared/countries';

@Component({
  selector: 'app-address-fieldset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-fieldset.component.html',
  styleUrl: './address-fieldset.component.css'
})
export class AddressFieldsetComponent {
  @Output() onFormGroupChange = new EventEmitter<FormGroup>()

  form!: FormGroup
  placeholders!: any
  countries: Country[] = []

  ngOnInit() {
    this.countries = countries

    this.form = new FormGroup({
      country: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl(0),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required])
    })

    this.placeholders = {
      postalCode: faker.location.zipCode(),
      street: faker.location.street(),
      number: faker.number.int({ min: 1, max: 10000 }),
      city: faker.location.city()
    }

    this.onFormGroupChange.emit(this.form)
  }
}
