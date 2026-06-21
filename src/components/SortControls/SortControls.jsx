import { useProducts } from "../../context/ProductContext";
import styles from "./SortControls.module.css";

const OPTIONS = [
  { value: "vendidos", label: "Más buscados" },
  { value: "precio", label: "Precio" },
  { value: "fecha", label: "Fecha modificación" },
];

export default function SortControls() {
  const { sortBy, setSortBy, sortOrder, setSortOrder } = useProducts();

  return (
    <div className={styles.controls}>
      <span className={styles.label}>Ordenar por</span>
      <select
        className={styles.select}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <button
        className={`${styles.orderBtn} ${sortOrder === "asc" ? styles.orderBtnActive : ""}`}
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        title={sortOrder === "asc" ? "Ascendente" : "Descendente"}
      >
        {sortOrder === "asc" ? "↑" : "↓"}
      </button>
    </div>
  );
}
