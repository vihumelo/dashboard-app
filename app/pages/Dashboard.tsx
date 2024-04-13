import styles from "./Dashboard.module.css";
import TableComponent from "../components/Dashboard/Tablecomponent";
import App from "../components/TopBar/MenuNav";
export default function Dashboard() {
  return (
    <>
      <div className={styles.container}>
        <TableComponent />
      </div>
    </>
  );
}
