import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faker } from '@faker-js/faker'
import { ToastrService } from 'ngx-toastr';
import { VeterinarianService } from '../../../services/veterinarian.service';
import { AddressFieldsetComponent } from '../../../components/address-fieldset/address-fieldset.component';

@Component({
  selector: 'app-create-veterinarian',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AddressFieldsetComponent],
  templateUrl: './create-veterinarian.component.html',
  styleUrl: './create-veterinarian.component.css'
})
export class CreateVeterinarianComponent {
  form!: FormGroup
  addressForm!: FormGroup
  placeholders!: typeof this.form.value
  submitted = false

  constructor(
    private router: Router,
    private veterinarianService: VeterinarianService,
    private toastr: ToastrService
  ) { }

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
        number: faker.number.int({min:1, max: 10000}),
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
  }

  onSubmit() {
    this.submitted = true
    if (!this.form.valid || !this.addressForm.valid) {
      return
    }

    const veterinarian = {
      address: this.addressForm.getRawValue(),
      ...this.form.getRawValue()
    }

    this.veterinarianService.post(veterinarian).subscribe({
      next: (value) => {
        this.toastr.success('Veterinarian successfully created', '', {
          progressBar: true,
          positionClass: 'toast-bottom-right'
        })
        this.router.navigate(['/veterinarians'])
      },
      error: (error) => {
        this.toastr.error('Error on creating veterinarian', '', {
          progressBar: true,
          positionClass: 'toast-bottom-right'
        })
      }
    })
  }
}
