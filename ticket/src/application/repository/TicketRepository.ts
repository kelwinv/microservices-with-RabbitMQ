import { Ticket } from "../../domain/entities/Ticket";

interface TicketRepository {
  save(ticket: Ticket): Promise<void>;
  updateStatus(ticket: Ticket): Promise<void>;
  get(ticketId: string): Promise<Ticket>;
}

export { TicketRepository };
