import axios from "axios";

const register = async (uuid: string, token: string) => {
  const res = axios
    .post("/api/register", { uuid, token })
    .then((res) => res.data);
  return res;
};

export const backend = {
  register,
};
