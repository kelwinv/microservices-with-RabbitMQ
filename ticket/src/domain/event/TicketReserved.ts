class TicketReserved {
  constructor(
    readonly ticketId: string,
    readonly eventId: string,
    readonly creditCardToken: string,
    readonly email: string,
    public price: number
  ) {}
}

export { TicketReserved };
