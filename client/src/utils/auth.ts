import { server } from "../global/server";

export const logout = (): void => {
  if (localStorage.getItem("jid")) {
    localStorage.removeItem("jid");
  }
};

export const isLogin = async (): Promise<boolean> => {
  if (localStorage.getItem("jid")) {
    const res = await fetch(`${server}/auth/check`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("jid"),
      },
    });

    const data = await res.json();
    if (data.done) {
      return true;
    } else {
      logout();
      return false;
    }
  }
  return false;
};

export const authCheck = async (history: any, authReq: boolean) => {
  const login = await isLogin();
  if (authReq) {
    if (!login) {
      history.push("/login");
    }
  } else {
    if (login) {
      history.push("/");
    }
  }
};

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
      console.log(data.error);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
