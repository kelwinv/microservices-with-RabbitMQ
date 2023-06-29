import { Ticket } from "../../domain/entities/Ticket";
import { TicketReserved } from "../../domain/event/TicketReserved";
import { Registry } from "../../infra/Registry/Registry";
import { Queue } from "../../infra/queue/Queue";
import { EventRepository } from "../repository/EventRepository";
import { TicketRepository } from "../repository/TicketRepository";

export default class PurchaseTicket {
  eventRepository: EventRepository;
  ticketRepository: TicketRepository;
  queue: Queue;

  constructor(readonly registry: Registry) {
    this.ticketRepository = registry.inject(
      "ticketRepository"
    ) as TicketRepository;
    this.eventRepository = registry.inject(
      "eventRepository"
    ) as EventRepository;
    this.queue = registry.inject("queue") as Queue;
  }

  async execute(input: Input): Promise<Output> {
    const event = await this.eventRepository.get(input.eventId);

    const ticket = Ticket.create({
      email: input.email,
      eventId: event.eventId,
    });

    await this.ticketRepository.save(ticket);

    const ticketReserved = new TicketReserved(
      ticket.ticketId,
      ticket.eventId,
      input.creditCardToken,
      input.email,
      event.price
    );

    console.log(`> ticket: ticket ${ticket.ticketId} reserved.`);
    await this.queue.publish("ticketReserved", ticketReserved);

    return {
      ticketId: ticket.eventId,
    };
  }
}

type Input = {
  eventId: string;
  email: string;
  creditCardToken: string;
};

type Output = {
  ticketId: string;
};
