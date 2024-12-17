"use client";

import { CardProductProps } from "@/app/components/detail/DetailClient";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartContextProps {
  cartPrdcts: CardProductProps[] | null;
  addToBasket: (product: CardProductProps) => void;
  addToBasketIncrease: (product: CardProductProps) => void;
  addToBasketDecrease: (product: CardProductProps) => void;
  removeFromCart: (product: CardProductProps) => void;
  removeCart: () => void;
}

const CartContext = createContext<CartContextProps | null>(null);

interface Props {
  children: React.ReactNode;
}

export const CartContextProvider = ({ children }: Props) => {
  const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null);

  // Sepeti localStorage'dan yükle
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      const parsedCart = storedCart ? JSON.parse(storedCart) : null;
      setCartPrdcts(parsedCart);
    } catch (error) {
      console.error("Local Storage'dan veri alınamadı:", error);
    }
  }, []);

  // Sepeti localStorage'a kaydet
  useEffect(() => {
    if (cartPrdcts !== null) {
      localStorage.setItem("cart", JSON.stringify(cartPrdcts));
    }
  }, [cartPrdcts]);

  // Sepete ürün ekleme
  const addToBasket = (product: CardProductProps) => {
    setCartPrdcts(prev => {
      const alreadyInCart = prev?.some(item => item.id === product.id);
      if (alreadyInCart) {
        toast.error("Ürün zaten sepette!");
        return prev;
      }

      const updatedCart = prev ? [...prev, product] : [product];
      toast.success("Ürün sepete eklendi!");
      return updatedCart;
    });
  };

  // Sepete eklenen ürünün miktarını arttırma
  const addToBasketIncrease = (product: CardProductProps) => {
    if (!cartPrdcts) return;
    const updatedCart = cartPrdcts.map(item =>
      item.id === product.id
        ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
        : item
    );
    if (product.quantity === 10) {
      toast.error("Daha fazla ekleyemezsiniz!");
      return;
    }
    setCartPrdcts(updatedCart);
  };

  // Sepete eklenen ürünün miktarını azaltma
  const addToBasketDecrease = (product: CardProductProps) => {
    if (!cartPrdcts) return;
    if (product.quantity === 1) {
      toast.error("Daha az ekleyemezsiniz!");
      return;
    }
    const updatedCart = cartPrdcts.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartPrdcts(updatedCart);
  };

  // Sepete eklenen ürünü silme
  const removeFromCart = (product: CardProductProps) => {
    if (!cartPrdcts) return;
    const filteredCart = cartPrdcts.filter(item => item.id !== product.id);
    setCartPrdcts(filteredCart);
    toast.success("Ürün sepetten silindi!");
  };

  const removeCart = () => {
    setCartPrdcts(null);
    localStorage.removeItem("cart");
    toast.success("Sepet temizlendi!");
  };

  const value: CartContextProps = {
    cartPrdcts,
    addToBasket,
    addToBasketIncrease,
    addToBasketDecrease,
    removeFromCart,
    removeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart, CartContextProvider dışında kullanılamaz!");
  }
  return context;
};

export default useCart;