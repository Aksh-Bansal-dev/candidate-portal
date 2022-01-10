import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authCheck, logout } from "../../utils/auth";
import TableRow from "../../components/TableRow";
import styles from "./styles.module.css";
import { getCandidates } from "src/utils/candidateUtils";

const HomePage: React.FC = () => {
  const history = useHistory();
  const [load, setLoad] = useState(true);
  const [cand, setCand] = useState([]);
  useEffect(() => {
    authCheck(history, true);
    (async () => {
      const res = await getCandidates();
      if (res.done) {
        setLoad(false);
        setCand(res.data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (load) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.info}>Candidate List: {cand.length}</div>
      <table className={styles.table} cellSpacing="0" cellPadding="0">
        <tbody>
          <tr className={styles.tableHead}>
            <th></th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Result</th>
            <th></th>
          </tr>
          {cand.map((e: any, i) => (
            <TableRow key={i} {...{ ...e, sno: i + 1 }} />
          ))}
        </tbody>
      </table>
      <div className={styles.highlight}>
        <Link to="/create">+ Add new Candidate</Link>
      </div>
      <button
        className={styles.logout}
        onClick={() => {
          logout();
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
