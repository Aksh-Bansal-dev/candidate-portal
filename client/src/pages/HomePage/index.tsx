import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isLogin } from "src/utils/auth/isAuth";

const HomePage: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    const redirect = async () => {
      const login = await isLogin();
      if (!login) {
        history.push("/login");
      }
    };
    redirect();
  }, [history]);
  return (
    <div>
      <h1>Candidates list</h1>
    </div>
  );
};

export default HomePage;
