import { useParams, Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className={styles.page}>
        <Link to="/" className={styles.backLink}>← Volver a la tienda</Link>
        <div className={styles.notFound}>
          <div className={styles.notFoundIcon}>🕯</div>
          <p>Este artículo se ha desvanecido entre las nieblas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>← Volver a la tienda</Link>

      <div className={styles.detail}>
        <div className={styles.imageSection}>
          <img className={styles.image} src={product.imagen} alt={product.nombre} />
        </div>

        <div className={styles.infoSection}>
          <span className={styles.category}>{product.categoria}</span>
          <h1 className={styles.name}>{product.nombre}</h1>
          <p className={styles.description}>{product.descripcion}</p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Tipo de daño</span>
              <span className={styles.statValue}>
                {product.tipoDaño || "—"}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Daño</span>
              <span className={`${styles.statValue} ${styles.statHighlight}`}>
                {product.daño || "—"}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Peso</span>
              <span className={styles.statValue}>{product.peso} kg</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Requisitos</span>
              <span className={styles.statValue}>{product.requisitos}</span>
            </div>
            <div className={styles.stat} style={{ gridColumn: "1 / -1" }}>
              <span className={styles.statLabel}>Efecto</span>
              <span className={styles.statValue}>{product.efecto}</span>
            </div>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>
              {product.precio.toLocaleString()} ⊛
            </span>
            <span className={styles.sold}>
              {product.vendidos} Sinluces lo han adquirido
            </span>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.btnAdd}
              onClick={() => addToCart(product)}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
