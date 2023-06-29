import { Transaction } from "../../domain/entities/Transaction";

interface TransactionRepository {
  save(transaction: Transaction): Promise<void>;
}

export { TransactionRepository };
