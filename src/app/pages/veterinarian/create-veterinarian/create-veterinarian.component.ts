import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faker } from '@faker-js/faker'
import { ToastrService } from 'ngx-toastr';
import { VeterinarianService } from '../../../services/veterinarian.service';

@Component({
  selector: 'app-create-veterinarian',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-veterinarian.component.html',
  styleUrl: './create-veterinarian.component.css'
})
export class CreateVeterinarianComponent {
  form!: FormGroup
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
      address: new FormGroup({
        country: new FormControl('', [Validators.required]),
        postalCode: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
        number: new FormControl(0),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required])
      })
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

  reset() {
    this.submitted = false
    this.form.reset()
  }

  onSubmit() {
    this.submitted = true
    if (!this.form.valid) {
      return
    }

    const veterinarian = this.form.getRawValue()
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
