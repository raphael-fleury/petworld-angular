import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VeterinarianService } from '../../../services/http/veterinarian.service';
import { Veterinarian } from '../../../models/veterinarian.model';
import { VeterinarianFormComponent } from '../../../components/veterinarian-form/veterinarian-form.component';

@Component({
  selector: 'app-edit-veterinarian',
  standalone: true,
  imports: [CommonModule, RouterModule, VeterinarianFormComponent],
  templateUrl: './edit-veterinarian.component.html',
  styleUrl: './edit-veterinarian.component.css'
})
export class EditVeterinarianComponent {
  id = ''
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
    this.id = this.route.snapshot.paramMap.get('id') ?? ""
    this.loadVeterinarian()
  }

  private loadVeterinarian() {
    this.veterinarianService.getById(this.id).subscribe({
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
    this.veterinarianService.put(this.id, veterinarian).subscribe({
      next: (value) => {
        this.toastr.success('Veterinarian successfully edited', '', {
          progressBar: true,
          positionClass: 'toast-bottom-right'
        })
        this.router.navigate([`/veterinarians/details/${this.id}`])
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
