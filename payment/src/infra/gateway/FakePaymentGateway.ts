import { Input, Output, PaymentGateway } from "../../gateway/PaymentGateway";

class FakePaymentGateway implements PaymentGateway {
  async createTransaction(input: Input): Promise<Output> {
    console.log(`> generating transaction for ${input.email}`);
    return {
      tid: "23912312",
      status: "approved",
    };
  }
}

export { FakePaymentGateway };
