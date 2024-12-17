"use client";
import UseCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { MdShoppingBasket } from "react-icons/md";
const CardCount = () => {
  /* sepetteki ürünlerin sayısını göstermek için */
  const { cartPrdcts } = UseCart();

  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/cart")}
      className="hidden md:flex relative cursor-pointer"
    >
      <MdShoppingBasket size="30" />
      <div className="absolute -top-1 -right-2 text-xs bg-orange-900 w-5 h-5 flex items-center justify-center rounded-full">
        {/*  sepetteki ürünlerin sayısını göstermek için */}
        {cartPrdcts?.length}
      </div>
    </div>
  );
};

export default CardCount;
