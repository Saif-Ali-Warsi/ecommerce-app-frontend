import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const navigate = useNavigate();

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shippingCost = cartTotal > 0 ? 5 : 0;
  const orderTotal = cartTotal + shippingCost;

  // 1. Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        {/* Recessed Circular Icon Container */}
        <div className="w-20 h-20 bg-[#191C24] text-[#d9a79c] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[inset_3px_3px_6px_#101217,inset_-3px_-3px_6px_#222631]">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#d9a79c] mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          Your Cart is Empty
        </h2>
        <p className="text-[#8A93A5] mb-8 text-sm">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex cursor-pointer bg-[#191C24] text-[#d9a79c] font-bold py-3.5 px-6 rounded-2xl text-md shadow-[-6px_-6px_16px_#222631,6px_6px_16px_#101217] hover:shadow-[-3px_-3px_8px_#222631,3px_3px_8px_#101217] active:shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] transition-all items-center justify-center gap-1.5 mx-auto"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#CFD4DC] mb-8 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        Shopping Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const subtotal = (item.price * item.quantity).toFixed(2);

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#191C24] border-0 p-4 sm:p-5 rounded-2xl shadow-[-6px_-6px_14px_#222631,6px_6px_14px_#101217] transition-all"
              >
                {/* Item Thumbnail & Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Link to={`/products/${item.id}`}>
                    <div className="w-20 h-20 bg-[#191C24] rounded-xl overflow-hidden flex-shrink-0 p-1 shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]">
                      <img
                        src={item.thumbnail || item.images?.[0]}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </Link>
                  <div>
                    <Link to={`/products/${item.id}`}>
                      <h3 className="font-semibold text-[#CFD4DC] text-base line-clamp-1 hover:text-[#d9a79c] transition-colors drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm font-bold text-[#d9a79c] mt-0.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                      AED {item.price}
                    </p>
                    <p className="text-xs text-[#8A93A5] mt-1">
                      Subtotal:{" "}
                      <strong className="text-[#CFD4DC]">AED {subtotal}</strong>
                    </p>
                  </div>
                </div>

                {/* Controls & Delete Action */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#222631]">
                  {/* Quantity Stepper (Recessed Neomorphic Style) */}
                  <div className="flex items-center rounded-xl overflow-hidden bg-[#191C24] shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="cursor-pointer px-3 py-1.5 text-[#8A93A5] hover:text-[#CFD4DC] hover:bg-[#222631] transition-colors text-sm font-semibold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-sm font-bold text-[#CFD4DC] min-w-[2.2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="cursor-pointer px-3 py-1.5 text-[#8A93A5] hover:text-[#CFD4DC] hover:bg-[#222631] transition-colors text-sm font-semibold"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="cursor-pointer p-2.5 text-[#8A93A5] hover:text-red-400 bg-[#191C24] rounded-xl shadow-[-3px_-3px_6px_#222631,3px_3px_6px_#101217] hover:shadow-[-1px_-1px_3px_#222631,1px_1px_3px_#101217] active:shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631] transition-all"
                    aria-label="Remove item"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="bg-[#191C24] border-0 rounded-2xl p-6 shadow-[-8px_-8px_18px_#222631,8px_8px_18px_#101217]">
          <h3 className="text-lg font-bold text-[#CFD4DC] mb-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            Order Summary
          </h3>

          <div className="space-y-3 pb-4 border-b border-[#222631] text-sm">
            <div className="flex justify-between text-[#8A93A5]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#CFD4DC]">
                AED {cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-[#8A93A5]">
              <span>Shipping</span>
              <span className="font-semibold text-emerald-400">
                + AED {shippingCost.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-base font-bold text-[#CFD4DC] py-4">
            <span>Total</span>
            <span className="text-[#d9a79c] text-xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              AED {orderTotal.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            className="cursor-pointer w-full bg-[#191C24] text-[#d9a79c] font-bold py-3.5 px-4 rounded-xl text-md shadow-[-5px_-5px_12px_#222631,5px_5px_12px_#101217] hover:shadow-[-2px_-2px_6px_#222631,2px_2px_6px_#101217] active:shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5 mt-2"
            disabled={cartItems.length === 0}
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
