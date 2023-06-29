class Event {
  readonly price: number;
  constructor(
    readonly eventId: string,
    readonly description: string,
    price: number,
    readonly capacity: number
  ) {
    this.price = Number(price);
  }
}

export { Event };
