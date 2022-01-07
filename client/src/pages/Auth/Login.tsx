import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authCheck, login } from "../../utils/auth";
import styles from "./styles.module.css";

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await login(email, pass);
    if (res && res.done) {
      history.push("/");
      setErr("");
    } else {
      setErr("Invalid credentials");
    }
  };
  useEffect(() => {
    authCheck(history, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Login</div>
      <form className={styles.authform} onSubmit={handleSubmit}>
        <div className={styles.label}>Email id</div>
        <input
          className={styles.input}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="enter your email id"
        />
        <div className={styles.label}>Password</div>
        <input
          className={styles.input}
          type="password"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="enter your password"
        />
        <div className={styles.highlight}>Minimum 8 Alpha numeric</div>
        <div className={styles.btncontainer}>
          <button type="submit" className={styles.btn}>
            Login
          </button>
          <Link to="/signup" className={styles.link}>
            Sign Up
          </Link>
        </div>
        <div className={styles.feedback}>{err}</div>
      </form>
    </div>
  );
};

export default Login;
