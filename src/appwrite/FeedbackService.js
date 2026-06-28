import { databases } from "./config";
import { ID } from "appwrite";

const DATABASE_ID =
  import.meta.env.VITE_APPWRITE_DATABASE_ID;

const FEEDBACK_COLLECTION_ID =
  import.meta.env.VITE_APPWRITE_FEEDBACK_COLLECTION_ID;

class FeedbackService {
  async addFeedback(data) {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        FEEDBACK_COLLECTION_ID,
        ID.unique(),
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        }
      );
    } catch (error) {
      console.error(
        "Error Saving Feedback:",
        error
      );

      throw error;
    }
  }
}

const feedbackService = new FeedbackService();

export default feedbackService;