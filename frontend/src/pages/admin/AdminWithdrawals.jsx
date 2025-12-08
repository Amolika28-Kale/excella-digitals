import React, { useEffect, useState } from "react";
import API from "../../api";

export default function AdminWithdrawals() {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const res = await API.get("/admin/wallet/transactions");
      const list = res.data.tx || [];
      setRequests(list);
      setFiltered(list.filter((t) => t.status === "pending"));
    } catch (err) {
      console.error(err);
      alert("Failed to load withdrawal requests");
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    filterData(value, statusFilter);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    filterData(search, value);
  };

  const filterData = (searchText, status) => {
    const q = searchText.toLowerCase();

    let list = requests.filter((t) => {
      const matchUser =
        t.userId?.name.toLowerCase().includes(q) ||
        t.userId?.email.toLowerCase().includes(q);

      const matchStatus = status === "all" ? true : t.status === status;

      return matchUser && matchStatus;
    });

    setFiltered(list);
  };

  const approveRequest = async (txId) => {
    if (!window.confirm("Approve this withdrawal?")) return;

    try {
      await API.post("/admin/wallet/approve", { txId });
      alert("Withdrawal approved!");
      loadRequests();
    } catch (err) {
      console.error(err);
      alert("Error approving withdrawal");
    }
  };

  return (
    <div className="container">
      <h2 className="text-xl font-semibold mb-4">Withdrawal Requests</h2>

      <div className="flex gap-4 mb-4">
        <input
          className="input"
          placeholder="Search user..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <select
          className="input"
          value={statusFilter}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="success">Completed</option>
          <option value="failed">Rejected</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className="card p-0">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">User</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((tx) => (
              <tr key={tx._id} className="border-b">
                <td className="p-2">
                  {tx.userId?.name}
                  <br />
                  <span className="text-sm text-gray-600">
                    {tx.userId?.email}
                  </span>
                </td>

                <td className="p-2 font-semibold text-indigo-700">
                  ₹ {tx.amount}
                </td>

                <td className="p-2">
                  {tx.status === "pending" ? (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  ) : tx.status === "success" ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Rejected</span>
                  )}
                </td>

                <td className="p-2">
                  {new Date(tx.createdAt).toLocaleString()}
                </td>

                <td className="p-2">
                  {tx.status === "pending" && (
                    <button
                      className="btn"
                      onClick={() => approveRequest(tx._id)}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
