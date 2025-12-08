import React, { useEffect, useState } from "react";
import API from "../../api";
import { Save, Mail, User, Globe, Settings2, CreditCard  } from "lucide-react";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);

  // Admin profile
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Payment settings
  const [payment, setPayment] = useState({
    coursePrice: 1200,
    referralBonus: 600,
  });

  // Site settings
  const [site, setSite] = useState({
    siteName: "Excella",
    supportEmail: "",
    supportPhone: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get("/admin/settings");
      setProfile(res.data.profile);
      setPayment(res.data.payment);
      setSite(res.data.site);
    } catch (e) {}
    setLoading(false);
  };

  const update = async (key, data) => {
    try {
      await API.put(`/admin/settings/${key}`, data);
      alert("Updated successfully");
    } catch {
      alert("Update failed");
    }
  };

  const systemAction = async (action) => {
    if (!confirm("Are you sure?")) return;
    try {
      await API.post("/admin/settings/action", { action });
      alert("Action completed");
    } catch {
      alert("Failed");
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container max-w-4xl">

      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Settings2 size={28} className="text-indigo-600" />
        Admin Settings
      </h1>

      {/* ======================== ADMIN PROFILE ======================== */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8 border">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <User size={20} className="text-indigo-600" /> Admin Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="Admin Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <input
            className="input"
            placeholder="Admin Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <input
            className="input md:col-span-2"
            type="password"
            placeholder="Change Password (optional)"
            value={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
        </div>

        <button
          className="btn mt-4 flex items-center gap-2"
          onClick={() => update("profile", profile)}
        >
          <Save size={18} /> Update Profile
        </button>
      </div>

      {/* ======================== PAYMENT SETTINGS ======================== */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8 border">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CreditCard size={20} className="text-indigo-600" /> Payment Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="input"
            type="number"
            placeholder="Course Price (₹)"
            value={payment.coursePrice}
            onChange={(e) =>
              setPayment({ ...payment, coursePrice: e.target.value })
            }
          />
          <input
            className="input"
            type="number"
            placeholder="Referral Bonus (₹)"
            value={payment.referralBonus}
            onChange={(e) =>
              setPayment({ ...payment, referralBonus: e.target.value })
            }
          />
        </div>

        <button
          className="btn mt-4 flex items-center gap-2"
          onClick={() => update("payment", payment)}
        >
          <Save size={18} /> Save Payment Settings
        </button>
      </div>

      {/* ======================== SITE SETTINGS ======================== */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8 border">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Globe size={20} className="text-indigo-600" /> Site Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="Website Name"
            value={site.siteName}
            onChange={(e) => setSite({ ...site, siteName: e.target.value })}
          />
          <input
            className="input"
            placeholder="Support Email"
            value={site.supportEmail}
            onChange={(e) => setSite({ ...site, supportEmail: e.target.value })}
          />
          <input
            className="input md:col-span-2"
            placeholder="Support WhatsApp Number"
            value={site.supportPhone}
            onChange={(e) => setSite({ ...site, supportPhone: e.target.value })}
          />
        </div>

        <button
          className="btn mt-4 flex items-center gap-2"
          onClick={() => update("site", site)}
        >
          <Save size={18} /> Save Site Settings
        </button>
      </div>

      {/* ======================== SYSTEM ACTIONS ======================== */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6 border">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Settings2 size={20} className="text-indigo-600" /> System Actions
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            className="btn bg-red-600 text-white"
            onClick={() => systemAction("clear_failed_payments")}
          >
            Clear Failed Payments
          </button>

          <button
            className="btn bg-indigo-600 text-white"
            onClick={() => systemAction("send_test_email")}
          >
            Send Test Email
          </button>

          <button
            className="btn bg-yellow-600 text-white"
            onClick={() => systemAction("clear_pending_withdrawals")}
          >
            Clear Pending Withdrawals
          </button>

          <button
            className="btn bg-gray-800 text-white"
            onClick={() => systemAction("maintenance_toggle")}
          >
            Toggle Maintenance Mode
          </button>
        </div>
      </div>
    </div>
  );
}
