import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "elden-ring-cart";

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((item) => item.id === action.product.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...state, { ...action.product, cantidad: 1 }];
    }
    case "REMOVE":
      return state.filter((item) => item.id !== action.id);
    case "UPDATE_CANTIDAD":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, cantidad: Math.max(1, action.cantidad) }
          : item
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) =>
    dispatch({ type: "ADD", product });
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE", id });
  const updateCantidad = (id, cantidad) =>
    dispatch({ type: "UPDATE_CANTIDAD", id, cantidad });
  const clearCart = () =>
    dispatch({ type: "CLEAR" });

  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrecio = cart.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCantidad,
        clearCart,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
