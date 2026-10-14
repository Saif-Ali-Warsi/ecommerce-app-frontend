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

  if (!order) {
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#d9a79c] mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          No Order Details Found
        </h2>
        <p className="text-[#8A93A5] mb-8 text-sm">
          We couldn't locate any recent order details.
        </p>
        <Link
          to="/products"
          className="inline-flex cursor-pointer bg-[#191C24] text-[#d9a79c] font-bold py-3.5 px-6 rounded-2xl text-md shadow-[-6px_-6px_16px_#222631,6px_6px_16px_#101217] hover:shadow-[-3px_-3px_8px_#222631,3px_3px_8px_#101217] active:shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] transition-all items-center justify-center gap-1.5 mx-auto"
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
        <div className="w-16 h-16 bg-[#191C24] text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[-6px_-6px_14px_#222631,6px_6px_14px_#101217] animate-bounce">
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
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-[#191C24] px-4 py-1.5 rounded-full shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]">
          Order Confirmed
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#CFD4DC] mt-4 mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          Thank you, {order.fullName}!
        </h1>
        <p className="text-sm text-[#8A93A5]">
          Your order has been successfully placed and is being processed.
        </p>
        <div className="mt-3 text-xs text-[#535C6D]">
          Order ID: <strong className="text-[#CFD4DC]">#{orderId}</strong>
        </div>
      </div>

      {/* Details Card Container */}
      <div className="bg-[#191C24] rounded-3xl shadow-[-8px_-8px_20px_#222631,8px_8px_20px_#101217] overflow-hidden mb-8 border-0">
        {/* Delivery Details Section */}
        <div className="p-6 sm:p-8 border-b border-[#222631]">
          <h2 className="text-base font-bold text-[#CFD4DC] mb-4 flex items-center gap-2.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            <div className="p-2 rounded-xl bg-[#191C24] text-[#d9a79c] shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]">
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
            Delivery Address & Contact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#8A93A5] bg-[#191C24] p-5 rounded-2xl shadow-[inset_3px_3px_6px_#101217,inset_-3px_-3px_6px_#222631]">
            <div>
              <p className="font-semibold text-[#CFD4DC] mb-1">
                {order.fullName}
              </p>
              <p className="text-xs text-[#535C6D]">{order.email}</p>
            </div>
            <div>
              <p className="text-[#CFD4DC] whitespace-pre-line">
                {order.address}
              </p>
              <p className="text-[#CFD4DC] mt-1">
                {order.city}, {order.pinCode}
              </p>
            </div>
          </div>
        </div>

        {/* Order Financials Section */}
        <div className="p-6 sm:p-8 bg-[#191C24] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#535C6D] mb-1">
              Total Paid
            </h3>
            <span className="text-2xl font-extrabold text-[#d9a79c] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              AED {order.total.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-[#191C24] px-4 py-2 rounded-xl shadow-[inset_2px_2px_4px_#101217,inset_-2px_-2px_4px_#222631]">
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
          className="cursor-pointer bg-[#191C24] text-[#d9a79c] font-bold py-4 px-8 rounded-2xl text-md shadow-[-6px_-6px_16px_#222631,6px_6px_16px_#101217] hover:shadow-[-3px_-3px_8px_#222631,3px_3px_8px_#101217] active:shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] transition-all flex items-center justify-center gap-1.5"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
