export interface SupplierRequest{
  name: string;
  contact: string;
  rating: number;
}

export interface SupplierResponse extends SupplierRequest{
  id: number;
}
