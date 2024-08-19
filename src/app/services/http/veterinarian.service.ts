import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Veterinarian } from 'app/models/veterinarian.model';

type VeterinarianWithId = Veterinarian & {id: string}

@Injectable({
  providedIn: 'root'
})
export class VeterinarianService {

  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(`${this.apiUrl}/veterinarians`)
  }

  getById(id: string) {
    return this.http.get<VeterinarianWithId>(`${this.apiUrl}/veterinarians/${id}`)
  }

  post(veterinarian: Veterinarian) {
    return this.http.post<VeterinarianWithId>(`${this.apiUrl}/veterinarians`, veterinarian)
  }

  put(id: string, veterinarian: Veterinarian) {
    return this.http.put<VeterinarianWithId>(`${this.apiUrl}/veterinarians/${id}`, veterinarian)
  }

  patch(id: string, veterinarian: Partial<Veterinarian>) {
    return this.http.patch<VeterinarianWithId>(`${this.apiUrl}/veterinarians/${id}`, veterinarian)
  }

  deleteById(id: string) {
    return this.http.delete<VeterinarianWithId>(`${this.apiUrl}/veterinarians/${id}`)
  }
}
