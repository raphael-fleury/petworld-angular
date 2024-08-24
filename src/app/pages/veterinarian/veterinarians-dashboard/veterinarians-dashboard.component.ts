import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VeterinarianWithId } from 'app/models/veterinarian.model';
import { VeterinarianService } from 'app/services/http/veterinarian.service';
import { ConfirmDialogComponent } from 'app/components/confirm-dialog/confirm-dialog.component';
import addressFormatter from '@fragaria/address-formatter'

@Component({
  selector: 'app-veterinarians-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmDialogComponent],
  templateUrl: './veterinarians-dashboard.component.html',
  styleUrl: './veterinarians-dashboard.component.css'
})
export class VeterinariansDashboardComponent {
  loadingState = 'loading'
  veterinarians: VeterinarianWithId[] = []
  veterinarianToDelete: VeterinarianWithId | null = null
  hasNext = false

  constructor(
    private veterinarianService: VeterinarianService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadVeterinarians()
  }

  loadVeterinarians(extend = false) {
    this.loadingState = 'loading'
    const skip = extend ? this.veterinarians.length : 0
    this.veterinarianService.get({skip}).subscribe({
      next: (value) => {
        if (extend) {
          this.veterinarians.push(...value.results)
        } else {
          this.veterinarians = value.results
        }
        this.hasNext = value.pagination.hasNext
        this.loadingState = 'done'
      },
      error: (error) => {
        this.toastr.error('Check your internet connection', 'Error on loading veterinarians', {
          progressBar: true,
          positionClass: 'toast-bottom-right'
        })
        this.loadingState = 'error'
      },
    })
  }

  loadMore() {
    this.loadVeterinarians(true)
  }

  formatAddress({ address }: VeterinarianWithId) {
    return addressFormatter.format({
      houseNumber: address.number?.toString(),
      road: address.street,
      city: address.city,
      postcode: address.postalCode,
      stateCode: address.state,
      countryCode: address.country,
    }, { fallbackCountryCode: 'US' })
  }

  deleteVeterinarian({ id, name }: VeterinarianWithId) {
    this.veterinarianService.deleteById(id).subscribe({
      next: (value) => {
        this.toastr.success(`"${name}" no longer exists`, 'Veterinarian successfully deleted', {
          progressBar: true,
          positionClass: 'toast-bottom-right'
        })
        this.veterinarianToDelete = null
        this.loadVeterinarians()
      },
      error: (error) => {
        this.toastr.error('Check your internet connection', `Error on deleting veterinarian "${name}"`, {
          progressBar: true,
          positionClass: 'toast-bottom-right'
        })
      }
    })
  }
}
