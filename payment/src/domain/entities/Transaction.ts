import crypto from "crypto";

class Transaction {
  private constructor(
    readonly transactionId: string,
    readonly ticketId: string,
    readonly eventId: string,
    readonly tid: string,
    readonly price: number,
    readonly status: string
  ) {}

  static create({
    ticketId,
    eventId,
    tid,
    price,
    status,
  }: createTransactionType) {
    return new Transaction(
      crypto.randomUUID(),
      ticketId,
      eventId,
      tid,
      price,
      status
    );
  }
}

type createTransactionType = {
  ticketId: string;
  eventId: string;
  tid: string;
  price: number;
  status: string;
};

export { Transaction };
