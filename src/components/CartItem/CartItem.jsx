import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./CartItem.module.css";

export default function CartItem({ item }) {
  const { removeFromCart, updateCantidad } = useCart();

  return (
    <div className={styles.item}>
      <Link to={`/producto/${item.id}`}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={item.imagen} alt={item.nombre} />
        </div>
      </Link>

      <div className={styles.info}>
        <Link to={`/producto/${item.id}`}>
          <h4 className={styles.name}>{item.nombre}</h4>
        </Link>
        <p className={styles.price}>
          {item.precio.toLocaleString()} ⊛ c/u
        </p>
      </div>

      <div className={styles.actions}>
        <div className={styles.quantityControl}>
          <button
            className={styles.quantityBtn}
            onClick={() => updateCantidad(item.id, item.cantidad - 1)}
            disabled={item.cantidad <= 1}
          >
            −
          </button>
          <span className={styles.quantity}>{item.cantidad}</span>
          <button
            className={styles.quantityBtn}
            onClick={() => updateCantidad(item.id, item.cantidad + 1)}
          >
            +
          </button>
        </div>

        <span className={styles.subtotal}>
          ⊛ {(item.precio * item.cantidad).toLocaleString()}
        </span>

        <button
          className={styles.removeBtn}
          onClick={() => removeFromCart(item.id)}
          title="Eliminar del carrito"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
