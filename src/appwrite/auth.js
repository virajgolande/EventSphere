import { account } from "./config";
import { ID } from "appwrite";

class AuthService {
  async signup({ email, password, name }) {
    return await account.create(
      ID.unique(),
      email,
      password,
      name
    );
  }

  async login({ email, password }) {
  try {
    // Delete any existing session
    await account.deleteSession("current");
  } catch (error) {
    // Ignore if no session exists
  }

  return await account.createEmailPasswordSession(
    email,
    password
  );
}

  async logout() {
    return await account.deleteSession("current");
  }

  async getCurrentUser() {
    try {
      return await account.get();
    } catch {
      return null;
    }
  }
}

const authService = new AuthService();
export default authService;
