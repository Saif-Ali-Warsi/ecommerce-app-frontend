import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCart } from "../context/CartContext";
import { checkoutSchema } from "../validations/checkoutSchema";

type CheckoutFormData = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  pinCode: string;
};

function Checkout() {
  const { cartItems } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutSchema),
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  function onSubmit(data: CheckoutFormData) {
    console.log("Validate delivery details:", data);
    console.log("Order items:", cartItems);
    console.log("Order total:", total);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
        Checkout
      </h1>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Delivery Details Form */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Delivery Details
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Full Name
              </label>
              <input
                {...register("fullName")}
                type="text"
                placeholder="Enter Full Name"
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                  errors.fullName
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Delivery Address
              </label>
              <textarea
                {...register("address")}
                rows={3}
                placeholder="Enter your delivery address"
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                  errors.address
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
              ></textarea>
              {errors.address && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* City & PinCode Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* City */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                  City
                </label>
                <input
                  {...register("city")}
                  type="text"
                  placeholder="Enter City"
                  className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                    errors.city
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* PinCode */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                  Postal / Pin Code
                </label>
                <input
                  {...register("pinCode")}
                  type="text"
                  placeholder="Enter pin code"
                  className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                    errors.pinCode
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                />
                {errors.pinCode && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.pinCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-gray-900 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue to Payment
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 pb-4 border-b border-gray-200 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">
                AED {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-emerald-600">
                {shipping === 0 ? "Free" : `AED ${shipping.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-base font-bold text-gray-900 py-4">
            <span>Total</span>
            <span className="text-indigo-600 text-xl">
              AED {total.toFixed(2)}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-400 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-emerald-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Secure & encrypted checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
