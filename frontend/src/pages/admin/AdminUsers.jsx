import React, { useEffect, useState } from "react";
import API from "../../api";

/**
 * Admin Users Management
 * - GET /admin/users -> loads users list (populated)
 * - POST /admin/users/block -> { id, block } toggles blocked
 * - GET /admin/users/:id -> get single user details (optional)
 */

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all"); // all / paid / unpaid / blocked
  const [loading, setLoading] = useState(true);

  // modal
  const [viewUser, setViewUser] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/users");
      const list = res.data.users || [];
      setUsers(list);
      setFiltered(list);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
      setLoading(false);
    }
  };

  const applyFilters = (searchText = q, status = filter) => {
    const qq = (searchText || "").toLowerCase().trim();
    const list = users.filter((u) => {
      const matchText =
        u.name?.toLowerCase().includes(qq) ||
        u.email?.toLowerCase().includes(qq) ||
        (u.phone || "").toLowerCase().includes(qq) ||
        (u._id || "").toLowerCase().includes(qq);

      const matchStatus =
        status === "all"
          ? true
          : status === "paid"
          ? !!u.hasPaid
          : status === "unpaid"
          ? !u.hasPaid
          : status === "blocked"
          ? !!u.blocked
          : true;

      return matchText && matchStatus;
    });

    setFiltered(list);
  };

  const onSearch = (val) => {
    setQ(val);
    applyFilters(val, filter);
  };

  const onFilter = (v) => {
    setFilter(v);
    applyFilters(q, v);
  };

  const toggleBlock = async (id, currentlyBlocked) => {
    if (
      !window.confirm(
        `${currentlyBlocked ? "Unblock" : "Block"} this user? (${id})`
      )
    )
      return;
    try {
      await API.post("/admin/users/block", { id, block: !currentlyBlocked });
      // optimistic: update list
      const updated = users.map((u) =>
        u._id === id ? { ...u, blocked: !currentlyBlocked } : u
      );
      setUsers(updated);
      applyFilters(q, filter);
    } catch (err) {
      console.error(err);
      alert("Failed to update user status");
    }
  };

  const openUser = async (id) => {
    setViewLoading(true);
    try {
      // try fetch single user details endpoint if available
      const res = await API.get(`/admin/users/${id}`);
      setViewUser(res.data.user);
    } catch (err) {
      // fallback: find in local list
      const local = users.find((u) => u._id === id);
      setViewUser(local || null);
    } finally {
      setViewLoading(false);
    }
  };

  const closeUser = () => setViewUser(null);

  const exportCSV = () => {
    const rows = filtered.map((u) => ({
      id: u._id,
      name: u.name || "",
      email: u.email || "",
      phone: u.phone || "",
      hasPaid: u.hasPaid ? "Paid" : "Unpaid",
      referralCode: u.referralCode || "",
      referredBy: u.referredBy || "",
      walletBalance: u.walletBalance ?? 0,
      blocked: u.blocked ? "Blocked" : "Active",
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : ""
    }));
    const keys = Object.keys(rows[0] || {});
    const csv = [
      keys.join(","),
      ...rows.map((r) =>
        keys.map((k) => `"${String(r[k] ?? "").replace(/"/g, '""')}"`).join(",")
      )
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Users Management</h2>

        <div className="flex gap-3">
          <button className="btn" onClick={() => loadUsers()}>
            Refresh
          </button>
          <button className="btn" onClick={exportCSV} disabled={!filtered.length}>
            Export CSV
          </button>
        </div>
      </div>

      <div className="card mb-4 p-4">
        <div className="flex gap-3 items-center">
          <input
            className="input"
            placeholder="Search name, email, phone, id..."
            value={q}
            onChange={(e) => onSearch(e.target.value)}
          />
          <select value={filter} onChange={(e) => onFilter(e.target.value)} className="input w-44">
            <option value="all">All users</option>
            <option value="paid">Paid users</option>
            <option value="unpaid">Unpaid users</option>
            <option value="blocked">Blocked users</option>
          </select>
          <div className="text-sm text-gray-600 ml-auto">
            Total: {users.length} · Showing: {filtered.length}
          </div>
        </div>
      </div>

      <div className="card p-0">
        {loading ? (
          <div className="p-6 text-center">Loading users...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Paid</th>
                <th className="p-2">Wallet</th>
                <th className="p-2">Referral</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u._id} className="border-b">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.phone || "—"}</td>
                  <td className="p-2">{u.hasPaid ? "✅" : "—"}</td>
                  <td className="p-2">₹ {u.walletBalance ?? 0}</td>
                  <td className="p-2">
                    <div className="text-sm">
                      <div>Code: {u.referralCode || "—"}</div>
                      <div>By: {u.referredBy || "—"}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    {u.blocked ? (
                      <span className="text-red-600 font-semibold">Blocked</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Active</span>
                    )}
                  </td>

                  <td className="p-2">
                    <div className="flex gap-2">
                      <button className="btn" onClick={() => openUser(u._id)}>
                        View
                      </button>

                      <button
                        className={`btn ${u.blocked ? "bg-green-600" : "bg-red-600"}`}
                        onClick={() => toggleBlock(u._id, u.blocked)}
                      >
                        {u.blocked ? "Unblock" : "Block"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* User detail modal */}
      {viewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">User: {viewUser.name}</h3>
              <div>
                <button className="btn mr-2" onClick={() => navigator.clipboard?.writeText(viewUser._id)}>Copy ID</button>
                <button className="btn" onClick={closeUser}>Close</button>
              </div>
            </div>

            {viewLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div>{viewUser.email}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div>{viewUser.phone || "—"}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Wallet Balance</div>
                    <div>₹ {viewUser.walletBalance ?? 0}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Referral Code</div>
                    <div>{viewUser.referralCode || "—"}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Registration</h4>
                  <div className="text-sm text-gray-600">{new Date(viewUser.createdAt).toLocaleString()}</div>
                </div>

                {/* payments / referrals / other arrays if present */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Meta</h4>
                  <div className="text-sm">
                    Role: <strong>{viewUser.role || "user"}</strong>
                    <br />
                    Has Paid: <strong>{viewUser.hasPaid ? "Yes" : "No"}</strong>
                  </div>
                </div>

                {/* If user contains arrays like payments/referrals passed by backend you can show them here */}
                {viewUser.purchases?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Purchases</h4>
                    <ul className="text-sm">
                      {viewUser.purchases.map((p) => <li key={p._id}>{p.orderId || p.paymentId} — ₹{p.amount} — {new Date(p.createdAt).toLocaleDateString()}</li>)}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
