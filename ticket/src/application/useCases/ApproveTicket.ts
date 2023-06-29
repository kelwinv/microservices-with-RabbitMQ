import { Registry } from "../../infra/Registry/Registry";
import { TicketRepository } from "../repository/TicketRepository";

export default class ApproveTicket {
  ticketRepository: TicketRepository;

  constructor(readonly registry: Registry) {
    this.ticketRepository = registry.inject(
      "ticketRepository"
    ) as TicketRepository;
  }

  async execute(ticketId: string): Promise<void> {
    const ticket = await this.ticketRepository.get(ticketId);
    ticket.approve();
    await this.ticketRepository.updateStatus(ticket);
    console.log(`> ticket: ticket ${ticketId} updated.`);
  }
}
