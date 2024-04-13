import styles from "./Topbar.module.css";
import DropDownFilter from "./DropDownFilter";
import logo from "../../../public/images/logo.png";
import Image from "next/image";
import App from "./MenuNav";

export default function Topbar() {
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.nav}>
          <App />
        </div>
      </div>
      <div className={styles.floatbar}>
        <div className={styles.dropfilter}>
          <DropDownFilter />
        </div>
      </div>
    </>
  );
}
