import { server } from "../../global/server";
import { isLogin } from "../auth/isAuth";

export const deleteCandidate = async (id: string): Promise<any> => {
  try {
    if (!isLogin()) {
      return { done: false };
    }
    const res = await fetch(server + "/candidates/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "bearer " + localStorage.getItem("jid"),
      },
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