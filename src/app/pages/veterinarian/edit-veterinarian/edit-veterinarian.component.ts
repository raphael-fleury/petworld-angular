import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VeterinarianService } from '../../../services/veterinarian.service';
import { Veterinarian } from '../../../models/veterinarian.model';
import { VeterinarianFormComponent } from '../../../components/veterinarian-form/veterinarian-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-veterinarian',
  standalone: true,
  imports: [CommonModule, RouterModule, VeterinarianFormComponent],
  templateUrl: './edit-veterinarian.component.html',
  styleUrl: './edit-veterinarian.component.css'
})
export class EditVeterinarianComponent {
  veterinarian?: Veterinarian
  formDisabled = true

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private veterinarianService: VeterinarianService,
    private toastr: ToastrService
  ) { }

  get title() {
    return this.veterinarian
      ? `Edit "${this.veterinarian?.name}"`
      : "Edit Veterinarian"
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? ""
    this.veterinarianService.getById(id).subscribe({
      next: (veterinarian) => {
        this.veterinarian = veterinarian
        this.formDisabled = false
      },
      error: ({status, error}) => {
        this.router.navigate(['/veterinarians'])
        const [message, title] = (status === 404)
          ? ['Veterinarian not found', '']
          : ['Check your internet connection', 'Error on finding veterinarian']

        this.toastr.error(message, title, {
          progressBar: true,
          positionClass: 'toast-bottom-right'
        })
      }
    })
  }

  onSubmit(veterinarian: Veterinarian) {
    this.formDisabled = true
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
