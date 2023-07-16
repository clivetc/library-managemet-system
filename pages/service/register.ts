import { UserAuth } from "@/types/interfaces";
import axios from "axios";

const registerUser = async ({ username, password }: UserAuth) => {
  try {
    const response = await axios.post("/api/register", {
      username,
      password,
    });
    console.log("User registered:", response.data.user);
    // Perform additional actions, such as showing a success message or redirecting to a new page
  } catch (error) {
    console.error("Registration failed:", error.response.data.error);
    // Perform additional actions, such as showing an error message or handling specific error cases
  }
};
