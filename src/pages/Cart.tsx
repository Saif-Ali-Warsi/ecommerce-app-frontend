import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // 1. Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-sm"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
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
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-gray-100 p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Item Thumbnail & Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Link to={`/products/${item.id}`}>
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img
                        src={item.thumbnail || item.images?.[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div>
                    <Link to={`/products/${item.id}`}>
                      <h3 className="font-semibold text-gray-900 text-base line-clamp-1">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm font-bold text-indigo-600 mt-0.5">
                      AED {item.price}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Subtotal:{" "}
                      <strong className="text-gray-700">AED {subtotal}</strong>
                    </p>
                  </div>
                </div>

                {/* Controls & Delete Action */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="cursor-pointer px-3 py-1.5 text-gray-600 hover:bg-gray-200 transition-colors text-sm font-semibold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-sm font-semibold text-gray-900 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="cursor-pointer px-3 py-1.5 text-gray-600 hover:bg-gray-200 transition-colors text-sm font-semibold"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="cursor-pointer p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
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
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Order Summary
          </h3>

          <div className="space-y-3 pb-4 border-b border-gray-200 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">
                AED {cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-emerald-600">Free</span>
            </div>
          </div>

          <div className="flex justify-between text-base font-bold text-gray-900 py-4">
            <span>Total</span>
            <span className="text-indigo-600 text-xl">
              AED {cartTotal.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            className="cursor-pointer w-full bg-gray-900 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
