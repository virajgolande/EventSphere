import { storage } from "./config";
import { ID } from "appwrite";

const BUCKET_ID =
  import.meta.env.VITE_APPWRITE_BUCKET_ID;

class StorageService {
  async uploadFile(file) {
    try {
      return await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error(
        "Image Upload Failed:",
        error
      );

      throw error;
    }
  }

  getImageUrl(fileId) {
    if (!fileId) {
      return "/concert.jpg";
    }

    try {
      return storage.getFileView(
        BUCKET_ID,
        fileId
      );
    } catch (error) {
      console.error(
        "Image Fetch Failed:",
        error
      );

      return "/concert.jpg";
    }
  }
}

const storageService = new StorageService();

export default storageService;