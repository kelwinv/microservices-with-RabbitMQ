import { TicketRepository } from "../../application/repository/TicketRepository";
import { Ticket } from "../../domain/entities/Ticket";
import pgp from "pg-promise";

class TicketRepositoryDB implements TicketRepository {
  async save({ email, eventId, status, ticketId }: Ticket): Promise<void> {
    const connection = pgp()("postgres://postgres:docker@localhost:5432/app");
    await connection.query(
      "insert into storeClient.ticket (ticket_id, event_id, email, status) values ($1, $2, $3, $4)",
      [ticketId, eventId, email, status]
    );
    await connection.$pool.end();
  }

  async updateStatus(ticket: Ticket): Promise<void> {
    const connection = pgp()("postgres://postgres:docker@localhost:5432/app");
    await connection.query(
      "update storeClient.ticket set status = $1 where ticket_id = $2",
      [ticket.status, ticket.ticketId]
    );

    await connection.$pool.end();
  }

  async get(ticketId: string): Promise<Ticket> {
    const connection = pgp()("postgres://postgres:docker@localhost:5432/app");
    const [ticket] = await connection.query(
      "select * from storeClient.ticket where ticket_id = $1",
      [ticketId]
    );

    return new Ticket(
      ticket.ticket_id,
      ticket.event_id,
      ticket.email,
      ticket.status
    );
  }
}

export { TicketRepositoryDB };
