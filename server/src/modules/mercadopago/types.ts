export interface PaymentRequest {
  items: Array<{
    id: string;
    title: string;
    quantity: number;
    unit_price: number;
    currency_id?: string;
  }>;
  externalReference?: string;
}

export interface PreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
  date_created: string;
}
