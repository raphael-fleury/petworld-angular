import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VeterinarianService } from '../../../services/http/veterinarian.service';
import { Veterinarian } from '../../../models/veterinarian.model';
import { VeterinarianFormComponent } from '../../../components/veterinarian-form/veterinarian-form.component';

@Component({
  selector: 'app-create-veterinarian',
  standalone: true,
  imports: [RouterModule, VeterinarianFormComponent],
  templateUrl: './create-veterinarian.component.html',
  styleUrl: './create-veterinarian.component.css'
})
export class CreateVeterinarianComponent {

  constructor(
    private router: Router,
    private veterinarianService: VeterinarianService,
    private toastr: ToastrService
  ) { }

  onSubmit(veterinarian: Veterinarian) {
    this.veterinarianService.post(veterinarian).subscribe({
      next: (value) => {
        this.toastr.success('Veterinarian successfully created', '', {
          progressBar: true,
          positionClass: 'toast-bottom-right'
        })
        this.router.navigate([`/veterinarians/details/${value.id}`])
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
