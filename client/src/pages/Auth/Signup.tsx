import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authCheck, signup } from "src/utils/auth";
import styles from "./styles.module.css";

export const validEmailRegex = /^\S+@\S+$/;
export const validPhoneRegex = /^[0-9]{10}$/;
export const validPassRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&.])[A-Za-z\d@$!%*#?.&]{8,}$/;

const Signup: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validEmailRegex.test(email)) {
      setErr("Invalid email");
      return;
    }
    if (!validPhoneRegex.test(phone)) {
      setErr("Invalid Phone Number");
      return;
    }
    if (!validPassRegex.test(pass)) {
      setErr(
        "Password should be contain at least One Uppercase , One lowercase, One Numeric, One Special Character"
      );
      return;
    }
    const res = await signup(email, pass, phone);
    if (res && res.done) {
      history.push("/login");
      setErr("");
    } else {
      if (res.error === "Email already exists") setErr(res.error);
      else setErr("Invalid input");
    }
  };
  useEffect(() => {
    authCheck(history, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Sign Up</div>
      <form className={styles.authform} onSubmit={handleSubmit}>
        <div className={styles.label}>Email id</div>
        <input
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="enter your email id"
        />
        <div className={styles.label}>Phone Number</div>
        <input
          className={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          required
          placeholder="enter your phone number"
        />
        <div className={styles.label}>Password</div>
        <input
          className={styles.input}
          type="password"
          value={pass}
          required
          onChange={(e) => setPass(e.target.value)}
          placeholder="enter your password"
        />
        <div className={styles.highlight}>Minimum 8 Alpha numeric</div>
        <div className={styles.btncontainer}>
          <button type="submit" className={styles.btn}>
            Sign Up
          </button>
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </div>
      </form>
      <div className={styles.feedback}>{err}</div>
    </div>
  );
};

export default Signup;
