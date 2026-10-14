import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCart } from "../context/CartContext";
import { checkoutSchema } from "../validations/checkoutSchema";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
    navigate("/order-cofirmation", {
      state: {
        ...data,
        total,
      },
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-[#CFD4DC] mb-8 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        Checkout
      </h1>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Delivery Details Form */}
        <div className="lg:col-span-2 bg-[#191C24] border-0 rounded-3xl p-6 sm:p-8 shadow-[-8px_-8px_20px_#222631,8px_8px_20px_#101217]">
          <h2 className="text-lg font-bold text-[#CFD4DC] mb-6 flex items-center gap-2.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            <div className="p-2 rounded-xl bg-[#191C24] text-[#d9a79c] shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]">
              <svg
                className="w-5 h-5"
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
            </div>
            Delivery Details
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A93A5] mb-2">
                Full Name
              </label>
              <input
                {...register("fullName")}
                type="text"
                placeholder="Enter Full Name"
                className={`w-full px-5 py-3.5 bg-[#191C24] rounded-2xl text-sm text-[#CFD4DC] placeholder-[#535C6D] focus:outline-none transition-all ${
                  errors.fullName
                    ? "shadow-[inset_2px_2px_5px_#EF4444,inset_-2px_-2px_5px_#222631]"
                    : "shadow-[inset_3px_3px_6px_#101217,inset_-3px_-3px_6px_#222631] focus:shadow-[inset_1px_1px_2px_#101217,inset_-1px_-1px_2px_#222631]"
                }`}
              />
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A93A5] mb-2">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className={`w-full px-5 py-3.5 bg-[#191C24] rounded-2xl text-sm text-[#CFD4DC] placeholder-[#535C6D] focus:outline-none transition-all ${
                  errors.email
                    ? "shadow-[inset_2px_2px_5px_#EF4444,inset_-2px_-2px_5px_#222631]"
                    : "shadow-[inset_3px_3px_6px_#101217,inset_-3px_-3px_6px_#222631] focus:shadow-[inset_1px_1px_2px_#101217,inset_-1px_-1px_2px_#222631]"
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A93A5] mb-2">
                Delivery Address
              </label>
              <textarea
                {...register("address")}
                rows={3}
                placeholder="Enter your delivery address"
                className={`w-full px-5 py-3.5 bg-[#191C24] rounded-2xl text-sm text-[#CFD4DC] placeholder-[#535C6D] focus:outline-none transition-all ${
                  errors.address
                    ? "shadow-[inset_2px_2px_5px_#EF4444,inset_-2px_-2px_5px_#222631]"
                    : "shadow-[inset_3px_3px_6px_#101217,inset_-3px_-3px_6px_#222631] focus:shadow-[inset_1px_1px_2px_#101217,inset_-1px_-1px_2px_#222631]"
                }`}
              ></textarea>
              {errors.address && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* City & PinCode Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* City */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A93A5] mb-2">
                  City
                </label>
                <input
                  {...register("city")}
                  type="text"
                  placeholder="Enter City"
                  className={`w-full px-5 py-3.5 bg-[#191C24] rounded-2xl text-sm text-[#CFD4DC] placeholder-[#535C6D] focus:outline-none transition-all ${
                    errors.city
                      ? "shadow-[inset_2px_2px_5px_#EF4444,inset_-2px_-2px_5px_#222631]"
                      : "shadow-[inset_3px_3px_6px_#101217,inset_-3px_-3px_6px_#222631] focus:shadow-[inset_1px_1px_2px_#101217,inset_-1px_-1px_2px_#222631]"
                  }`}
                />
                {errors.city && (
                  <p className="mt-1.5 text-xs text-red-400 font-medium">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* PinCode */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A93A5] mb-2">
                  Postal / Pin Code
                </label>
                <input
                  {...register("pinCode")}
                  type="text"
                  placeholder="Enter pin code"
                  className={`w-full px-5 py-3.5 bg-[#191C24] rounded-2xl text-sm text-[#CFD4DC] placeholder-[#535C6D] focus:outline-none transition-all ${
                    errors.pinCode
                      ? "shadow-[inset_2px_2px_5px_#EF4444,inset_-2px_-2px_5px_#222631]"
                      : "shadow-[inset_3px_3px_6px_#101217,inset_-3px_-3px_6px_#222631] focus:shadow-[inset_1px_1px_2px_#101217,inset_-1px_-1px_2px_#222631]"
                  }`}
                />
                {errors.pinCode && (
                  <p className="mt-1.5 text-xs text-red-400 font-medium">
                    {errors.pinCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-[#191C24] text-[#d9a79c] font-bold py-4 px-4 rounded-2xl text-md shadow-[-6px_-6px_16px_#222631,6px_6px_16px_#101217] hover:shadow-[-3px_-3px_8px_#222631,3px_3px_8px_#101217] active:shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] transition-all flex items-center justify-center gap-2 mt-4"
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
        <div className="bg-[#191C24] border-0 rounded-3xl p-6 shadow-[-8px_-8px_18px_#222631,8px_8px_18px_#101217] sticky top-24">
          <h2 className="text-lg font-bold text-[#CFD4DC] mb-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            Order Summary
          </h2>

          <div className="space-y-3 pb-4 border-b border-[#222631] text-sm">
            <div className="flex justify-between text-[#8A93A5]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#CFD4DC]">
                AED {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-[#8A93A5]">
              <span>Shipping</span>
              <span className="font-semibold text-emerald-400">
                {shipping === 0 ? "Free" : `AED ${shipping.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-base font-bold text-[#CFD4DC] py-4">
            <span>Total</span>
            <span className="text-[#d9a79c] text-xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              AED {total.toFixed(2)}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-[#222631] text-xs text-[#8A93A5] flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#191C24] text-emerald-400 shadow-[inset_1px_1px_3px_#101217,inset_-1px_-1px_3px_#222631]">
              <svg
                className="w-4 h-4 flex-shrink-0"
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
            </div>
            <span>Secure & encrypted checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
