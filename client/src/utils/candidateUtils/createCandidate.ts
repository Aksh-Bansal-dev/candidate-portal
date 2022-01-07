import { server } from "../../global/server";
import { isLogin } from "../auth/isAuth";

export const createCandidate = async (
  name: string,
  email: string,
  address: string,
  pincode: string,
  dob: string,
  state: string
): Promise<any> => {
  try {
    if (!isLogin()) {
      return { done: false };
    }
    const body = {
      name,
      email,
      address,
      pincode,
      dob,
      state,
      result: "Shortlist",
    };
    const res = await fetch(server + "/candidates/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("jid"),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.done) {
      return data;
    } else {
      console.log(data.error);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
