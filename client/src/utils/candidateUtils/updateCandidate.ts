import { server } from "../../global/server";
import { isLogin } from "../auth/isAuth";

export const updateCandidate = async (
  id: string,
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
      id,
      state,
      result: "Shortlist",
    };
    const res = await fetch(server + "/candidates/update", {
      method: "PUT",
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
      console.log(data.err);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
