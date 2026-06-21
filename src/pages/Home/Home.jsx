import { useProducts } from "../../context/ProductContext";
import SortControls from "../../components/SortControls/SortControls";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Home.module.css";

export default function Home() {
  const { products } = useProducts();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Bienvenido, Sinluz</h1>
        <p className={styles.subtitle}>
          Forja tu leyenda con el equipo de los Semidioses
        </p>
      </section>

      <div className={styles.toolbar}>
        <SortControls />
        <span className={styles.count}>
          {products.length} artículos forjados
        </span>
      </div>

      {products.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🕯</div>
          <p className={styles.emptyText}>
            Las llamas del Erdtree aún no han revelado ningún artículo...
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
