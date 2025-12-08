import React, { useEffect, useState } from "react";
import API from "../../api";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const res = await API.get("/admin/payments");
      setPayments(res.data.pays || []);
      setFiltered(res.data.pays || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load payments");
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    filterPayments(value, statusFilter);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    filterPayments(search, value);
  };

  const filterPayments = (searchText, status) => {
    const q = searchText.toLowerCase();

    let list = payments.filter((p) => {
      const matchUser =
        p.userId?.name?.toLowerCase().includes(q) ||
        p.userId?.email?.toLowerCase().includes(q);

      const matchStatus =
        status === "all" ? true : p.status.toLowerCase() === status;

      return matchUser && matchStatus;
    });

    setFiltered(list);
  };

  return (
    <div className="container">
      <h2 className="text-xl font-semibold mb-4">Payments</h2>

      <div className="flex gap-4 mb-4">
        <input
          className="input"
          placeholder="Search by user name or email"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <select
          className="input"
          value={statusFilter}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="card p-0">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">User</th>
              <th className="p-2">Email</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Payment ID</th>
              <th className="p-2">Order ID</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p._id} className="border-b">
                <td className="p-2">{p.userId?.name}</td>
                <td className="p-2">{p.userId?.email}</td>
                <td className="p-2 font-semibold">₹ {p.amount}</td>
                <td className="p-2">{p.paymentId || "—"}</td>
                <td className="p-2">{p.orderId || "—"}</td>

                <td className="p-2">
                  {p.status === "success" ? (
                    <span className="text-green-600 font-semibold">
                      Success
                    </span>
                  ) : p.status === "pending" ? (
                    <span className="text-yellow-600 font-semibold">
                      Pending
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">Failed</span>
                  )}
                </td>

                <td className="p-2">
                  {new Date(p.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
