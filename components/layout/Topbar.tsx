import styles from "./Topbar.module.css";
import DropDownFilter from "./DropDownFilter";
import Image from "next/image";
import MenuNav from "./MenuNav";
import logo from "../../public/images/logo.png";
import type { LaboratoryUnit } from "../../domain/dashboard/types";

interface TopbarProps {
  selectedUnits: LaboratoryUnit[];
  onSelectedUnitsChange: (units: LaboratoryUnit[]) => void;
}

export default function Topbar({
  selectedUnits,
  onSelectedUnitsChange,
}: TopbarProps) {
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.logoContainer}>
          <Image
            src={logo}
            alt="Painel de resultados críticos"
            className={styles.logo}
          />
        </div>
        <nav className={styles.nav} aria-label="Navegação principal">
          <MenuNav />
        </nav>
      </div>
      <div className={styles.floatbar}>
        <div className={styles.dropfilter}>
          <DropDownFilter
            selectedUnits={selectedUnits}
            onSelectedUnitsChange={onSelectedUnitsChange}
          />
        </div>
      </div>
    </>
  );
}
