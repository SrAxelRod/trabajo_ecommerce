import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";
import styles from "./Cart.module.css";

export default function Cart() {
  const { cart, clearCart, totalItems, totalPrecio } = useCart();
  const [showModal, setShowModal] = useState(false);

  const handlePayment = () => {
    setShowModal(true);
  };

  const confirmPayment = () => {
    clearCart();
    setShowModal(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Carrito de Compra</h1>
        <div className={styles.actions}>
          {cart.length > 0 && (
            <button className={styles.clearBtn} onClick={clearCart}>
              Vaciar carrito
            </button>
          )}
        </div>
      </div>

      {cart.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🕯</div>
          <p className={styles.emptyText}>
            Tu carrito está vacío... Las Tierras Intermedias te esperan.
          </p>
          <Link to="/" className={styles.shopLink}>
            Explorar tienda
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>Resumen</h3>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Artículos</span>
              <span className={styles.summaryValue}>{totalItems}</span>
            </div>
            <div className={styles.summaryTotal}>
              <span className={styles.summaryTotalLabel}>Total</span>
              <span className={styles.summaryTotalValue}>
                ⊛ {totalPrecio.toLocaleString()}
              </span>
            </div>
            <button className={styles.checkoutBtn} onClick={handlePayment}>
              Pagar ahora
            </button>
          </div>
        </>
      )}

      {showModal && (
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>✦</div>
            <h2 className={styles.modalTitle}>¡Compra confirmada!</h2>
            <p className={styles.modalText}>
              Que los Dioses te acompañen, Sinluz. Tu pedido llegará a la
              Mesa Redonda en cuanto la llama guíe tu camino.
            </p>
            <p className={styles.modalTotal}>
              Total pagado: <strong>⊛ {totalPrecio.toLocaleString()}</strong>
            </p>
            <button className={styles.modalBtn} onClick={confirmPayment}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
