import Link from "next/link";
import style from "./Navbar.styles.module.css";

const Navbar = () => {
  return (
    <nav className={style.nav__layout}>
      <Link href={"/"} className={style.nav__button}>
        Home
      </Link>

      <Link href={"/log"} className={style.nav__button}>
        Log
      </Link>
    </nav>
  );
};

export default Navbar;
