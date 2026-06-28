import { databases } from "./config";
import { ID, Query } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TICKETS_COLLECTION_ID =
  import.meta.env.VITE_APPWRITE_TICKETS_COLLECTION_ID;

class TicketService {
  async createTicket(data) {
    return await databases.createDocument(
      DATABASE_ID,
      TICKETS_COLLECTION_ID,
      ID.unique(),
      {
        ticketId: data.ticketId,
        eventId: data.eventId,

        // User Details
        userName: data.userName,
        userEmail: data.userEmail,

        // Event Details
        title: data.title,
        location: data.location,
        date: data.date,
        time: data.time,

        // Ticket Status
        status: "VALID",

        // Booking Time
        bookedAt: new Date().toLocaleString(),
      }
    );
  }

  async getTicket(ticketId) {
    const response = await databases.listDocuments(
      DATABASE_ID,
      TICKETS_COLLECTION_ID,
      [Query.equal("ticketId", ticketId)]
    );

    if (response.documents.length === 0) {
      return null;
    }

    return response.documents[0];
  }

  async verifyTicket(ticketId) {
    const ticket = await this.getTicket(ticketId);

    if (!ticket) {
      return null;
    }

    return await databases.updateDocument(
      DATABASE_ID,
      TICKETS_COLLECTION_ID,
      ticket.$id,
      {
        status: "USED",
      }
    );
  }
}

const ticketService = new TicketService();

export default ticketService;