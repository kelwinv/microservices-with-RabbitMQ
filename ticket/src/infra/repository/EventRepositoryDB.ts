import pgp from "pg-promise";
import { EventRepository } from "../../application/repository/EventRepository";
import { Event } from "../../domain/entities/Event";

class EventRepositoryDB implements EventRepository {
  async get(id: string): Promise<Event> {
    const connection = pgp()("postgres://postgres:docker@localhost:5432/app");
    const [eventData] = await connection.query(
      "select * from storeClient.event where event_id = $1",
      [id]
    );

    console.log(eventData);

    return new Event(
      eventData.event_id,
      eventData.description,
      eventData.price,
      eventData.capacity
    );
  }
}

export { EventRepositoryDB };
