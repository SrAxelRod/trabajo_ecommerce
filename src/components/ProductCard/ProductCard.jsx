import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className={styles.card}>
      <Link to={`/producto/${product.id}`}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={product.imagen}
            alt={product.nombre}
            loading="lazy"
          />
        </div>
      </Link>

      <div className={styles.body}>
        <span className={styles.category}>{product.categoria}</span>
        <Link to={`/producto/${product.id}`}>
          <h3 className={styles.name}>{product.nombre}</h3>
        </Link>
        <p className={styles.description}>{product.descripcion}</p>

        <div className={styles.meta}>
          <span className={styles.price}>{product.precio.toLocaleString()} ⊛</span>
          <span className={styles.sold}>◈ {product.vendidos} vendidos</span>
        </div>

        <div className={styles.footer}>
          <Link to={`/producto/${product.id}`} className={styles.btnDetail}>
            Detalle
          </Link>
          <button className={styles.btnCart} onClick={() => addToCart(product)}>
            Añadir
          </button>
        </div>
      </div>
    </article>
  );
}
