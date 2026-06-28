import { databases } from "./config";
import { ID } from "appwrite";
import storageService from "./storageservice";

const DATABASE_ID =
  import.meta.env.VITE_APPWRITE_DATABASE_ID;

const COLLECTION_ID =
  import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;

class EventService {
  async addEvent(data) {
    try {
      let fileId = null;

      // Upload Image
      if (data.image) {
        const uploadedFile =
          await storageService.uploadFile(
            data.image
          );

        fileId = uploadedFile.$id;
      }

      // Save Event
      return await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          title: data.title,
          date: data.date,
          time: data.time,
          location: data.location,

          // IMPORTANT:
          // Your Appwrite column is named "ticketleft"
          ticketleft: Number(
            data.ticketLeft
          ),

          image: fileId,
        }
      );
    } catch (error) {
      console.error(
        "Error Creating Event:",
        error
      );

      throw error;
    }
  }

  async getEvents() {
    try {
      return await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID
      );
    } catch (error) {
      console.error(
        "Error Fetching Events:",
        error
      );

      throw error;
    }
  }

  async getEvent(documentId) {
    try {
      return await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        documentId
      );
    } catch (error) {
      console.error(
        "Error Fetching Event:",
        error
      );

      throw error;
    }
  }

  async updateTicketLeft(documentId, ticketLeft) {
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      documentId,
      {
        ticketleft: Number(ticketLeft),
      }
    );
  } catch (error) {
    console.error(
      "Error Updating Ticket Count:",
      error
    );

    throw error;
  }
}

  async deleteEvent(documentId) {
    try {
      return await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        documentId
      );
    } catch (error) {
      console.error(
        "Error Deleting Event:",
        error
      );

      throw error;
    }
  }
}

const eventService = new EventService();

export default eventService;