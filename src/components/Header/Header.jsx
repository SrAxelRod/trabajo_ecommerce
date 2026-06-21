import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./Header.module.css";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚔</span>
          ELDEN BAZAAR
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Tienda
          </Link>
          <Link to="/carrito" className={`${styles.navLink} ${styles.cartLink}`}>
            <span>Carrito</span>
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
