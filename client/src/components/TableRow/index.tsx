import React from "react";
import { useHistory } from "react-router-dom";
import { getDate } from "../../utils/getDate";
import { deleteCandidate } from "../../utils/candidateUtils";
import styles from "./styles.module.css";

interface TableRowInterface {
  sno: number;
  _id: string;
  name: string;
  email: string;
  dob: string;
  result: string;
}

const TableRow: React.FC<TableRowInterface> = ({
  sno,
  name,
  email,
  _id,
  dob,
  result,
}) => {
  const history = useHistory();
  const handleDelete = async (id: string) => {
    await deleteCandidate(id);
    window.location.reload();
  };
  const handleEdit = (id: string) => {
    history.push("/create/" + id);
  };
  return (
    <tr className={sno % 2 === 1 ? styles.row0 : styles.row1}>
      <td className={styles.cell}>{sno}</td>
      <td className={styles.cell}>{name}</td>
      <td className={styles.cell}>{getDate(dob)}</td>
      <td className={styles.cell}>{email}</td>
      <td className={styles.cell}>{result}</td>
      <td className={styles.cell}>
        <img
          className={styles.icon}
          src="/assets/pencil.png"
          width={12}
          alt="edit"
          title="edit"
          onClick={() => handleEdit(_id)}
        />
        <img
          className={styles.icon}
          src="/assets/delete.png"
          width={12}
          alt="delete"
          title="delete"
          onClick={() => handleDelete(_id)}
        />
      </td>
    </tr>
  );
};

export default TableRow;
