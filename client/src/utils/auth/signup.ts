import { server } from "src/global/server";

export const signup = async (
  email: string,
  password: string,
  phone: string
): Promise<any> => {
  try {
    const body = { email, password, phone };
    const res = await fetch(server + "/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.done) {
      return data;
    } else {
      console.log(data.err);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
