import crypto from "crypto";

class Ticket {
  constructor(
    readonly ticketId: string,
    readonly eventId: string,
    readonly email: string,
    public status: string
  ) {}

  static create({ eventId, email }: { eventId: string; email: string }) {
    const ticketId = crypto.randomUUID();
    const initialStatus = "reserved";

    return new Ticket(ticketId, eventId, email, initialStatus);
  }

  approve() {
    this.status = "approved";
  }

  cancel() {
    this.status = "canceled";
  }
}

export { Ticket };
