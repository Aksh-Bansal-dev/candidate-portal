import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  createCandidate,
  getCandidate,
  updateCandidate,
} from "src/utils/candidateUtils";
import { authCheck } from "../../utils/auth";
import { getDate } from "../../utils/getDate";
import styles from "./styles.module.css";

export const validEmailRegex = /^\S+@\S+$/;
export const validPinRegex = /^[0-9]{6}$/;

const CandidateForm: React.FC = (props) => {
  const history = useHistory();
  const params: { id: string } = useParams();

  const [update, setUpdate] = useState(false);
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [dob, setDob] = useState("");
  const [pin, setPin] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validEmailRegex.test(email)) {
      setErr("Invalid email");
      return;
    }
    if (!validPinRegex.test(pin)) {
      setErr("Invalid Pincode");
      return;
    }
    if (update) {
      const res = await updateCandidate(
        params.id,
        name,
        email,
        address,
        pin,
        dob,
        state,
        result
      );
      if (res && res.done) {
        history.push("/");
        setErr("");
      } else {
        setErr("Invalid inputs");
      }
    } else {
      const res = await createCandidate(name, email, address, pin, dob, state);
      if (res && res.done) {
        history.push("/");
        setErr("");
      } else {
        setErr("Invalid inputs");
      }
    }
  };

  useEffect(() => {
    authCheck(history, true);
    (async () => {
      if (params.id && params.id.length > 0) {
        setUpdate(true);
        const res = await getCandidate(params.id);
        if (res.done) {
          setEmail(res.data.email);
          setName(res.data.name);
          setAddress(res.data.address);
          const date = getDate(res.data.dob);
          setDob(date);
          setState(res.data.state);
          setPin(res.data.pincode);
          setResult(res.data.result);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        {update ? "Update" : "Create"} Candidate
      </div>
      <form className={styles.authform} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <div className={styles.leftSec}>
            <div className={styles.label}>Name</div>
            <input
              className={styles.input}
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="enter your Name"
            />
            <div className={styles.label}>Date of Birth</div>
            <input
              className={styles.input + " " + styles.dobInput}
              type="date"
              value={dob}
              required
              onChange={(e) => setDob(e.target.value)}
              placeholder="enter your Date of Birth"
            />
            <div className={styles.label}>Email id</div>
            <input
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="enter your email id"
            />
          </div>
          <div className={styles.rightSec}>
            <div className={styles.label}>Address</div>
            <input
              className={styles.input}
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="enter your Address"
            />
            <div className={styles.label}>State</div>
            <input
              className={styles.input}
              type="text"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="enter your State"
            />
            <div className={styles.label}>Pin Code</div>
            <input
              className={styles.input}
              type="text"
              value={pin}
              required
              onChange={(e) => setPin(e.target.value)}
              placeholder="enter your Pin Code"
            />
          </div>
        </div>
        <div className={styles.btncontainer}>
          <button className={styles.btnSec} onClick={() => history.push("/")}>
            Cancel
          </button>
          <button type="submit" className={styles.btn}>
            {update ? "Update" : "Create"}
          </button>
        </div>
        <div className={styles.feedback}>{err}</div>
      </form>
    </div>
  );
};

export default CandidateForm;
