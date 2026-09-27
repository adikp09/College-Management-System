import { useEffect, useState } from "react";
import axios from "axios";

function PaymentRequests() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ================= FETCH PAYMENT REQUESTS =================

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:5000/api/payments/requests",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setPayments(response.data);
    } catch (error) {
      console.log("Failed to fetch payment requests:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Failed to load payment requests."
        );
      } else {
        setError("Server connection failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // ================= APPROVE PAYMENT =================

  const handleApprove = async (paymentId) => {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this payment?"
    );

    if (!confirmApprove) {
      return;
    }

    try {
      setMessage("");
      setError("");

      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");

      const response = await axios.put(
        `http://127.0.0.1:5000/api/payments/approve/${paymentId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Payment approved successfully."
      );

      fetchPayments();

    } catch (error) {
      console.log("Approve Error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Failed to approve payment."
        );
      } else {
        setError("Server connection failed.");
      }
    }
  };

  // ================= REJECT PAYMENT =================

  const handleReject = async (paymentId) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this payment?"
    );

    if (!confirmReject) {
      return;
    }

    try {
      setMessage("");
      setError("");

      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");

      const response = await axios.put(
        `http://127.0.0.1:5000/api/payments/reject/${paymentId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Payment rejected successfully."
      );

      fetchPayments();

    } catch (error) {
      console.log("Reject Error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Failed to reject payment."
        );
      } else {
        setError("Server connection failed.");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Requests
        </h1>

        <p className="text-gray-500 mt-1">
          Review and manage student fee payments
        </p>
      </div>

      {/* Success Message */}

      {message && (
        <div className="mb-5 bg-green-100 text-green-700 border border-green-200 rounded-lg p-4">
          {message}
        </div>
      )}

      {/* Error Message */}

      {error && (
        <div className="mb-5 bg-red-100 text-red-700 border border-red-200 rounded-lg p-4">
          {error}
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-600">
            Loading payment requests...
          </p>
        </div>
      ) : payments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-500">
            No payment requests found.
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          {payments.map((payment) => (

            <div
              key={payment.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              {/* Top Section */}

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                {/* Student Information */}

                <div>

                  <h2 className="text-xl font-bold text-gray-800">
                    {payment.full_name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {payment.email}
                  </p>

                  <p className="text-gray-700 mt-4">
                    <span className="font-semibold">
                      Fee:
                    </span>{" "}
                    {payment.fee_type}
                  </p>

                </div>

                {/* Amount */}

                <div className="lg:text-right">

                  <p className="text-sm text-gray-500">
                    Payment Amount
                  </p>

                  <p className="text-2xl font-bold text-purple-600">
                    ₹{Number(payment.amount).toFixed(2)}
                  </p>

                </div>

              </div>

              {/* Payment Details */}

              <div className="grid md:grid-cols-3 gap-4 mt-6">

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">
                    Transaction ID
                  </p>

                  <p className="font-semibold text-gray-800 mt-1 break-all">
                    {payment.transaction_id}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">
                    Payment Method
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {payment.payment_method}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">
                    Status
                  </p>

                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      payment.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : payment.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>

              </div>

              {/* Date */}

              <p className="text-sm text-gray-500 mt-5">
                Submitted:{" "}
                {payment.created_at
                  ? new Date(
                      payment.created_at
                    ).toLocaleString()
                  : "N/A"}
              </p>

              {/* Action Buttons */}

              {payment.status === "Pending" && (
                <div className="flex flex-col sm:flex-row gap-3 mt-6">

                  <button
                    onClick={() =>
                      handleApprove(payment.id)
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Approve Payment
                  </button>

                  <button
                    onClick={() =>
                      handleReject(payment.id)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Reject Payment
                  </button>

                </div>
              )}

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default PaymentRequests;