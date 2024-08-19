import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VeterinarianFormComponent } from 'app/components/veterinarian-form/veterinarian-form.component';
import { Veterinarian } from 'app/models/veterinarian.model';
import { VeterinarianService } from 'app/services/http/veterinarian.service';

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
