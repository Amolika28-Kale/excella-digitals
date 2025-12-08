import React, { useEffect, useState } from "react";
import API from "../../api";

export default function AdminReferrals() {
  const [refs, setRefs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadReferrals();
  }, []);

  const loadReferrals = async () => {
    try {
      const res = await API.get("/admin/referrals");
      setRefs(res.data.refs || []);
      setFiltered(res.data.refs || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load referrals");
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    filterReferrals(value, statusFilter);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    filterReferrals(search, value);
  };

  const filterReferrals = (searchText, status) => {
    const q = searchText.toLowerCase();

    let list = refs.filter((r) => {
      const matchUsers =
        r.referrerUserId?.name.toLowerCase().includes(q) ||
        r.referrerUserId?.email.toLowerCase().includes(q) ||
        r.referredUserId?.name.toLowerCase().includes(q) ||
        r.referredUserId?.email.toLowerCase().includes(q);

      const matchStatus =
        status === "all" ? true : r.status.toLowerCase() === status;

      return matchUsers && matchStatus;
    });

    setFiltered(list);
  };

  return (
    <div className="container">
      <h2 className="text-xl font-semibold mb-4">Referral History</h2>

      <div className="flex gap-4 mb-4">
        <input
          className="input"
          placeholder="Search by referrer or referred user"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <select
          className="input"
          value={statusFilter}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="credited">Credited</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="card p-0">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">Referrer</th>
              <th className="p-2">Referred User</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((r) => (
              <tr key={r._id} className="border-b">
                <td className="p-2">
                  {r.referrerUserId?.name}
                  <br />
                  <span className="text-sm text-gray-600">
                    {r.referrerUserId?.email}
                  </span>
                </td>

                <td className="p-2">
                  {r.referredUserId?.name}
                  <br />
                  <span className="text-sm text-gray-600">
                    {r.referredUserId?.email}
                  </span>
                </td>

                <td className="p-2 font-semibold text-green-700">₹ {r.amount}</td>

                <td className="p-2">
                  {r.status === "credited" ? (
                    <span className="text-green-600 font-semibold">Credited</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>

                <td className="p-2">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
