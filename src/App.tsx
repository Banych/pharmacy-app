import { Link, Outlet } from "react-router-dom";
import styles from "./App.module.css";

import "./App.css";

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Link to={"/"}>Home</Link>
        <Link to={"/medicines"}>Medicines</Link>
        <Link to={"/sales"}>Sales</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
