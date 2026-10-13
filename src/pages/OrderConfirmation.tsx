import { Link, useLocation } from "react-router-dom";

type OrderData = {
  id: number;
  fullName: string;
  email: string;
  address: string;
  city: string;
  pinCode: string;
  total: number;
};

function OrderConfirmation() {
  const location = useLocation();
  const order = location.state as OrderData | null;

  // 1. No Order Found State
  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No Order Details Found
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          We couldn't locate any recent order details.
        </p>
        <Link
          to="/products"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-sm"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Generate a random order ID if not provided
  const orderId = order.id || Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Success Header Banner */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          Order Confirmed
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3 mb-1">
          Thank you, {order.fullName}!
        </h1>
        <p className="text-sm text-gray-500">
          Your order has been successfully placed and is being processed.
        </p>
        <div className="mt-2 text-xs text-gray-400">
          Order ID: <strong className="text-gray-700">#{orderId}</strong>
        </div>
      </div>

      {/* Details Card Container */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-8">
        {/* Delivery Details Section */}
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
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
            Delivery Address & Contact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div>
              <p className="font-semibold text-gray-900 mb-1">
                {order.fullName}
              </p>
              <p className="text-xs text-gray-500">{order.email}</p>
            </div>
            <div>
              <p className="text-gray-700 whitespace-pre-line">
                {order.address}
              </p>
              <p className="text-gray-700 mt-1">
                {order.city}, {order.pinCode}
              </p>
            </div>
          </div>
        </div>

        {/* Order Financials Section */}
        <div className="p-6 sm:p-8 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Total Paid
            </h3>
            <span className="text-2xl font-extrabold text-indigo-600">
              AED {order.total.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Payment Successful
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/products"
          className="bg-gray-900 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-xl transition-all text-center shadow-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
