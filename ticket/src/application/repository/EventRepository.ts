import { Event } from "../../domain/entities/Event";

export interface EventRepository {
  get(id: string): Promise<Event>;
}
