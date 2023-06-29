import { Transaction } from "../../domain/entities/Transaction";
import { PaymentApproved } from "../../domain/event/PaymentApproved";
import { PaymentGateway } from "../../gateway/PaymentGateway";
import { Registry } from "../../infra/Registry/Registry";
import { Queue } from "../../infra/queue/Queue";
import { TransactionRepository } from "../repository/TransactionRepository";

export default class ProcessPayment {
  transactionRepository: TransactionRepository;
  paymentGateway: PaymentGateway;
  queue: Queue;

  constructor(readonly registry: Registry) {
    this.paymentGateway = registry.inject("paymentGateway") as PaymentGateway;
    this.transactionRepository = registry.inject(
      "transactionRepository"
    ) as TransactionRepository;
    this.queue = registry.inject("queue") as Queue;
  }

  async execute(input: Input): Promise<void> {
    const output = await this.paymentGateway.createTransaction({
      email: input.email,
      creditCardToken: input.creditCardToken,
    });

    const transaction = Transaction.create({
      eventId: input.eventId,
      price: input.price,
      status: output.status,
      ticketId: input.ticketId,
      tid: output.tid,
    });
    await this.transactionRepository.save(transaction);

    if (transaction.status === "approved") {
      const paymentApproved = new PaymentApproved(input.ticketId);
      console.log(`> payment: ticket ${input.ticketId} Approved.`);
      await this.queue.publish("paymentApproved", paymentApproved);
    }
  }
}

type Input = {
  eventId: string;
  email: string;
  creditCardToken: string;
  price: number;
  ticketId: string;
};
