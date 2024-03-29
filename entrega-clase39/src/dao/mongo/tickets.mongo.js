import Tickets from "./models/ticket.models.js";

class TicketManager {
  async get() {
    try {
      const tickets = await Tickets.find();
      return tickets;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async create(ticketData) {
    try {
        const ticket = await Tickets.create(ticketData)
        return ticket;
    } catch (error) {
        console.log(error);
        throw error;
    }
  }
}

export default TicketManager;
