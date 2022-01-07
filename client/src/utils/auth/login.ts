import { server } from "src/global/server";

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const body = { email, password };
    const res = await fetch(server + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.done) {
      localStorage.setItem("jid", data.accessToken);
      return data;
    } else {
      console.log(data.error);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
