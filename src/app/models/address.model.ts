export type Address = {
  country: string,
  postalCode: string,
  street: string,
  number?: number,
  city: string,
  state: string
}

export const emptyAddress = {
  country: '',
  postalCode: '',
  street: '',
  city: '',
  state: '',
}
