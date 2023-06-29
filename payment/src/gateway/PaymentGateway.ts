export interface PaymentGateway {
  createTransaction(input: Input): Promise<Output>;
}

export type Input = {
  email: string;
  creditCardToken: string;
};

export type Output = {
  tid: string;
  status: string;
};
