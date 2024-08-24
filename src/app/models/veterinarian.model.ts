import { Address, emptyAddress } from "./address.model";

export type Veterinarian = {
  name: string,
  email: string,
  phone: string,
  address: Address,
}

export type VeterinarianWithId = Veterinarian & {id: string}

export const emptyVeterinarian = {
  name: '',
  email: '',
  phone: '',
  address: emptyAddress,
}
