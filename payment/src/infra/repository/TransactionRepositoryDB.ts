import { TransactionRepository } from "../../application/repository/TransactionRepository";
import pgp from "pg-promise";
import { Transaction } from "../../domain/entities/Transaction";

class TransactionRepositoryDB implements TransactionRepository {
  async save({
    eventId,
    price,
    status,
    ticketId,
    tid,
    transactionId,
  }: Transaction): Promise<void> {
    const connection = pgp()("postgres://postgres:docker@localhost:5432/app");
    await connection.query(
      "insert into storeClient.transaction (transaction_id, ticket_id, event_id, tid, price, status) values ($1, $2, $3, $4, $5, $6)",
      [transactionId, ticketId, eventId, tid, price, status]
    );
    await connection.$pool.end();
  }
}

export { TransactionRepositoryDB };
