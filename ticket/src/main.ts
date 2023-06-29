import express from "express";
import PurchaseTicket from "./application/useCases/PurchaseTicket";

import { Registry } from "./infra/Registry/Registry";
import { TicketRepositoryDB } from "./infra/repository/TicketRepositoryDB";
import { EventRepositoryDB } from "./infra/repository/EventRepositoryDB";
import { RabbitMQAdapter } from "./infra/queue/RabbitMQAdapter";
import { QueueController } from "./infra/queue/QueueController";
import ApproveTicket from "./application/useCases/ApproveTicket";

async function main() {
  const app = express();

  app.use(express.json());

  const registry = new Registry();

  const queue = new RabbitMQAdapter();
  await queue.connect();

  registry.provide("ticketRepository", new TicketRepositoryDB());
  registry.provide("eventRepository", new EventRepositoryDB());
  registry.provide("queue", queue);
  registry.provide("ApproveTicket", new ApproveTicket(registry));
  new QueueController(registry);

  app.post("/purchase_ticket", async (req, res) => {
    const { eventId, email, creditCardToken } = req.body;

    const purchaseTicket = new PurchaseTicket(registry);

    const response = await purchaseTicket.execute({
      creditCardToken,
      email,
      eventId,
    });
    res.json(response).status(200);
  });

  app.listen(3333, () => {
    console.log("listening on port 3333");
  });
}

main();
