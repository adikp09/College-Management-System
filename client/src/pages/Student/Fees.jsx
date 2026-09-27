import { useEffect, useState } from "react";
import axios from "axios";

function Fees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected fee for payment
  const [selectedFee, setSelectedFee] = useState(null);

  // Payment form
  const [transactionId, setTransactionId] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://127.0.0.1:5000/api/fees/my",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setFees(response.data);
      } catch (error) {
        console.log("Failed to fetch fees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  const totalFee = fees.reduce(
    (sum, fee) => sum + Number(fee.amount),
    0
  );

  const paidFee = fees.reduce(
    (sum, fee) => sum + Number(fee.paid_amount),
    0
  );

  const pendingFee = totalFee - paidFee;

  // ================= SUBMIT PAYMENT =================

  const handlePaymentSubmit = async () => {
    setPaymentMessage("");
    setPaymentError("");

    if (!transactionId.trim()) {
      setPaymentError("Please enter your UTR / Transaction ID.");
      return;
    }

    const pendingAmount =
      Number(selectedFee.amount) -
      Number(selectedFee.paid_amount);

    try {
      setPaymentLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:5000/api/payments/submit",
        {
          fee_id: selectedFee.id,
          amount: pendingAmount,
          transaction_id: transactionId.trim(),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setPaymentMessage(
        response.data.message || "Payment submitted successfully."
      );

      setTransactionId("");

    } catch (error) {
      console.log("Payment Submit Error:", error);

      if (error.response) {
        setPaymentError(
          error.response.data.message ||
            "Failed to submit payment."
        );
      } else {
        setPaymentError("Server connection failed.");
      }
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-8">
        Fees
      </h1>

      {loading ? (
        <p className="text-gray-600">
          Loading fees...
        </p>
      ) : fees.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-600">
            No fees found.
          </p>
        </div>
      ) : (
        <>
          {/* ================= SUMMARY ================= */}

          <div className="grid md:grid-cols-3 gap-5 mb-8">

            {/* Total */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-500">
                Total Fee
              </p>

              <h2 className="text-2xl font-bold mt-2">
                ₹{totalFee.toFixed(2)}
              </h2>
            </div>

            {/* Paid */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-500">
                Paid
              </p>

              <h2 className="text-2xl font-bold text-green-600 mt-2">
                ₹{paidFee.toFixed(2)}
              </h2>
            </div>

            {/* Pending */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-500">
                Pending
              </p>

              <h2 className="text-2xl font-bold text-red-600 mt-2">
                ₹{pendingFee.toFixed(2)}
              </h2>
            </div>

          </div>

          {/* ================= FEE HISTORY ================= */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-6">
              Fee History
            </h2>

            <div className="space-y-4">

              {fees.map((fee) => {

                const pending =
                  Number(fee.amount) -
                  Number(fee.paid_amount);

                return (
                  <div
                    key={fee.id}
                    className="border rounded-xl p-5"
                  >

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      {/* Fee Information */}

                      <div>
                        <h3 className="text-lg font-bold">
                          {fee.fee_type}
                        </h3>

                        <p className="text-gray-600">
                          Total: ₹
                          {Number(fee.amount).toFixed(2)}
                        </p>

                        <p className="text-green-600">
                          Paid: ₹
                          {Number(fee.paid_amount).toFixed(2)}
                        </p>

                        <p className="text-red-600">
                          Pending: ₹
                          {pending.toFixed(2)}
                        </p>

                        <p className="text-gray-600">
                          Due Date:{" "}
                          {fee.due_date
                            ? String(fee.due_date)
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("/")
                            : "N/A"}
                        </p>
                      </div>

                      {/* Status + Pay Button */}

                      <div className="flex flex-col items-start md:items-end gap-3">

                        <span
                          className={`px-4 py-2 rounded-full font-semibold ${
                            fee.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : fee.status === "Partial"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {fee.status}
                        </span>

                        {pending > 0 && (
                          <button
                            onClick={() => {
                              setSelectedFee(fee);
                              setTransactionId("");
                              setPaymentMessage("");
                              setPaymentError("");
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                          >
                            Pay Now
                          </button>
                        )}

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        </>
      )}

      {/* ================= PAYMENT MODAL ================= */}

      {selectedFee && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative max-h-[95vh] overflow-y-auto">

            {/* Close */}

            <button
              onClick={() => setSelectedFee(null)}
              className="absolute top-4 right-5 text-gray-500 hover:text-black text-2xl"
            >
              ×
            </button>

            {/* Heading */}

            <div className="text-center">

              <h2 className="text-2xl font-bold text-gray-800">
                Pay Your Fees
              </h2>

              <p className="text-gray-500 mt-1">
                {selectedFee.fee_type}
              </p>

            </div>

            {/* Amount */}

            <div className="bg-gray-100 rounded-xl p-4 mt-5 text-center">

              <p className="text-gray-500">
                Pending Amount
              </p>

              <p className="text-3xl font-bold text-red-600 mt-1">
                ₹
                {(
                  Number(selectedFee.amount) -
                  Number(selectedFee.paid_amount)
                ).toFixed(2)}
              </p>

            </div>

            {/* QR */}

            <div className="mt-5 flex justify-center">

              <img
                src="/phonepe-qr.jpeg"
                alt="PhonePe Payment QR"
                className="w-64 h-64 object-contain border rounded-xl"
              />

            </div>

            {/* Payment Text */}

            <div className="text-center mt-4">

              <p className="font-semibold text-gray-800">
                Scan & Pay Using PhonePe
              </p>

              <p className="text-gray-500 text-sm mt-1">
                ADITYA KUMAR
              </p>

            </div>

            {/* ================= UTR INPUT ================= */}

            <div className="mt-6">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                UTR / Transaction ID
              </label>

              <input
                type="text"
                value={transactionId}
                onChange={(e) =>
                  setTransactionId(e.target.value)
                }
                placeholder="Enter UTR / Transaction ID"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              />

              <p className="text-xs text-gray-500 mt-2">
                After completing the PhonePe payment, enter the
                transaction ID here.
              </p>

            </div>

            {/* Error */}

            {paymentError && (
              <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-lg text-sm">
                {paymentError}
              </div>
            )}

            {/* Success */}

            {paymentMessage && (
              <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-lg text-sm">
                {paymentMessage}
              </div>
            )}

            {/* Submit */}

            <button
              onClick={handlePaymentSubmit}
              disabled={paymentLoading}
              className={`w-full mt-5 py-3 rounded-lg font-semibold text-white transition ${
                paymentLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {paymentLoading
                ? "Submitting..."
                : "Submit Payment"}
            </button>

            {/* Close */}

            <button
              onClick={() => setSelectedFee(null)}
              className="w-full mt-3 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Fees;