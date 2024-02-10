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

      <Link href={"/map"} className={style.nav__button}>
        Map
      </Link>

      <Link href={"/test#testArea"} className={style.nav__button}>
        Test
      </Link>
    </nav>
  );
};

export default Navbar;
