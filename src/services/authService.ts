import { UserLogIn } from "@/types";
import httpService from "./httpService";

const authEndPoint = "auth/";

const authService = {
  login: async (payload: UserLogIn) => {
    const { data } = await httpService.post(authEndPoint + "login", payload);
    return data;
  }
};

export default authService;
