import { UserCreate, UserUpdate } from "@/types";
import httpService from "./httpService";

const userEndPoint = "users/";

const userService = {
  create: async (payload: UserCreate) => {
    const { data } = await httpService.post(userEndPoint + "add", payload);
    return data;
  },
  update: async (payload: UserUpdate) => {
    const { data } = await httpService.post(userEndPoint + "change", payload);
    return data;
  },
  updateActivity: async (id: number) => {
    const { data } = await httpService.get(userEndPoint + `changeActivity?user_id=${id}`);
    return data;
  },
  delete: async (id: number) => {
    const { data } = await httpService.get(userEndPoint + `delete?user_id=${id}`);
    return data;
  },
  get: async () => {
    const { data } = await httpService.get(userEndPoint + "show");
    return data;
  },
  getAll: async () => {
    const { data } = await httpService.get(userEndPoint + "showAll");
    return data;
  }
};

export default userService;
