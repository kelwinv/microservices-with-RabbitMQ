export interface Queue {
  connect(): Promise<void>;
  on<EventProps>(
    queueName: string,
    callback: (event: EventProps) => void
  ): Promise<void>;
  publish(queueName: string, data: unknown): Promise<void>;
}
