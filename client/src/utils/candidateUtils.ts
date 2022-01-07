import { server } from "../global/server";
import { isLogin } from "./auth";

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
      console.log(data.error);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCandidate = async (id: string): Promise<any> => {
  try {
    if (!isLogin()) {
      return { done: false };
    }
    const res = await fetch(server + "/candidates/" + id, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("jid"),
      },
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

export const getCandidates = async (): Promise<any> => {
  try {
    if (!isLogin()) {
      return { done: false };
    }
    const res = await fetch(server + "/candidates/", {
      headers: {
        Authorization: "bearer " + localStorage.getItem("jid"),
      },
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

export const updateCandidate = async (
  id: string,
  name: string,
  email: string,
  address: string,
  pincode: string,
  dob: string,
  state: string,
  result: string
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
      _id: id,
      state,
      result,
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
      console.log(data.error);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
