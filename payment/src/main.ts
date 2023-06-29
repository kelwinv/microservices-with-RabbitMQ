import { Registry } from "./infra/Registry/Registry";
import { FakePaymentGateway } from "./infra/gateway/FakePaymentGateway";
import { TransactionRepositoryDB } from "./infra/repository/TransactionRepositoryDB";
import ProcessPayment from "./application/useCases/ProcessPayment";
import { RabbitMQAdapter } from "./infra/queue/RabbitMQAdapter";
import { QueueController } from "./infra/queue/QueueController";

async function main() {
  const registry = new Registry();

  const queue = new RabbitMQAdapter();
  await queue.connect();

  registry.provide("transactionRepository", new TransactionRepositoryDB());
  registry.provide("paymentGateway", new FakePaymentGateway());
  registry.provide("queue", queue);
  registry.provide("processPayment", new ProcessPayment(registry));
  new QueueController(registry);
}

main();
