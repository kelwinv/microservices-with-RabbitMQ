import ProcessPayment from "../../application/useCases/ProcessPayment";
import { TicketReserved } from "../../domain/event/TicketReserved";
import { Registry } from "../Registry/Registry";
import { Queue } from "./Queue";

class QueueController {
  constructor(readonly registry: Registry) {
    const queue = registry.inject("queue") as Queue;
    const processPayment = registry.inject("processPayment") as ProcessPayment;

    queue.on<TicketReserved>("ticketReserved", (event) => {
      processPayment.execute(event);
    });
  }
}

export { QueueController };
