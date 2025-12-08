import React, { useEffect, useState } from "react";
import API from "../../api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    paidUsers: 0,
    totalRevenue: 0,
    totalReferrals: 0,
    pendingWallet: 0,
  });

  const [recentPayments, setRecentPayments] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [usersRes, paymentRes, referralRes, walletRes] =
        await Promise.all([
          API.get("/admin/users"),
          API.get("/admin/payments"),
          API.get("/admin/referrals"),
          API.get("/admin/wallet/transactions"),
        ]);

      const users = usersRes.data.users;
      const payments = paymentRes.data.pays;
      const referrals = referralRes.data.refs;
      const withdraw = walletRes.data.tx;

      const paidUsers = users.filter((u) => u.hasPaid).length;
      const totalRevenue = payments.filter(p => p.status === "success").length * 1200;
      const pendingWallet = withdraw.filter((t) => t.status === "pending").length;

      // Recent 5 payments
      const recent = payments.slice(0, 5);

      // Graph – Revenue in last 7 days
      const daily = {};
      payments.forEach((p) => {
        const d = new Date(p.createdAt).toLocaleDateString();
        if (!daily[d]) daily[d] = 0;
        if (p.status === "success") daily[d] += 1200;
      });

      const last7 = Object.entries(daily).slice(-7);

      setStats({
        totalUsers: users.length,
        paidUsers,
        totalRevenue,
        totalReferrals: referrals.length,
        pendingWallet,
      });

      setRecentPayments(recent);

      setGraphData(last7);
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = {
    labels: graphData.map((i) => i[0]),
    datasets: [
      {
        label: "Revenue (₹)",
        data: graphData.map((i) => i[1]),
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.3)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="container">

      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* TOP METRICS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="card p-4">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
        </div>

        <div className="card p-4">
          <p className="text-gray-500">Paid Users</p>
          <h2 className="text-2xl font-bold">{stats.paidUsers}</h2>
        </div>

        <div className="card p-4">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold">₹ {stats.totalRevenue}</h2>
        </div>

        <div classnName="card p-4">
          <p className="text-gray-500">Total Referrals</p>
          <h2 className="text-2xl font-bold">{stats.totalReferrals}</h2>
        </div>

        <div className="card p-4">
          <p className="text-gray-500">Pending Withdrawals</p>
          <h2 className="text-2xl font-bold">{stats.pendingWallet}</h2>
        </div>
      </div>

      {/* REVENUE GRAPH */}
      <div className="card mt-6 p-4">
        <h2 className="text-xl font-semibold mb-3">Revenue (Last 7 Days)</h2>
        <Line data={chartData} />
      </div>

      {/* RECENT PAYMENTS */}
      <div className="card mt-6 p-4">
        <h2 className="text-xl font-semibold mb-3">Recent Payments</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">User</th>
              <th className="p-2">Email</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentPayments.map((p) => (
              <tr key={p._id} className="border-b">
                <td className="p-2">{p?.userId?.name}</td>
                <td className="p-2">{p?.userId?.email}</td>
                <td className="p-2">₹ {p.amount}</td>
                <td className="p-2">
                  {p.status === "success" ? (
                    <span className="text-green-600 font-bold">Success</span>
                  ) : (
                    <span className="text-red-600 font-bold">Failed</span>
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
