import React, { useEffect, useState } from "react";
import API from "../api";
import { Wallet, IndianRupee, ArrowDownCircle } from "lucide-react";
import StudentLayout from "../layout/StudentLayout";

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    API.get("/wallet/me")
      .then((r) => {
        setBalance(r.data.balance);
        setTxs(r.data.transactions);
      })
      .catch(() => {});
  }, []);

  const withdraw = async () => {
    try {
      await API.post("/wallet/withdraw", { amount: Number(amount) });
      alert("Withdrawal request sent!");
      setAmount("");
    } catch (err) {
      alert(err?.response?.data?.error || "Error");
    }
  };

  return (
    <StudentLayout>
    <div className="p-6 max-w-2xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <Wallet size={35} className="text-purple-600" />
        <h1 className="text-3xl font-bold">My Wallet</h1>
      </div>

      {/* BALANCE CARD */}
      <div className="bg-white shadow rounded-xl p-6 mb-6 border">
        <h3 className="text-lg font-semibold text-gray-600">Available Balance</h3>
        <div className="text-4xl font-bold mt-2 flex items-center gap-2">
          <IndianRupee size={32} className="text-green-600" />
          {balance}
        </div>

        {/* WITHDRAW BOX */}
        <div className="mt-6">
          <label className="text-sm font-semibold">Withdraw Amount</label>
          <input
            className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-400 outline-none"
            placeholder="Enter amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={withdraw}
            className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition"
          >
            <ArrowDownCircle size={18} />
            Request Withdrawal
          </button>
        </div>
      </div>

      {/* TRANSACTIONS LIST */}
      <h2 className="text-xl font-semibold mb-3">Transaction History</h2>

      {txs.length === 0 && (
        <p className="text-gray-500">No transactions yet.</p>
      )}

      <div className="space-y-3">
        {txs.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-xl p-4 shadow border flex justify-between"
          >
            <div>
              <div className="font-semibold">
                {t.type === "credit" ? "Earning" : "Withdrawal"}
              </div>
              <div className="text-sm text-gray-600">₹{t.amount}</div>
            </div>

            <div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  t.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : t.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
    </StudentLayout>
  );
}
