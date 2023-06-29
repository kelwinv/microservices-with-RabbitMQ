import ApproveTicket from "../../application/useCases/ApproveTicket";
import { PaymentApproved } from "../../domain/event/PaymentApproved";
import { Registry } from "../Registry/Registry";
import { Queue } from "./Queue";

class QueueController {
  constructor(readonly registry: Registry) {
    const queue = registry.inject("queue") as Queue;
    const ApproveTicket = registry.inject("ApproveTicket") as ApproveTicket;

    queue.on<PaymentApproved>("paymentApproved", (event) => {
      ApproveTicket.execute(event.ticketId);
    });
  }
}

export { QueueController };
