import React, { useEffect, useState } from "react";
import API from "../api";
import { Users, Link2, Copy, Wallet, Gift } from "lucide-react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaTelegram,
  FaEnvelope,
} from "react-icons/fa";
import StudentLayout from "../layout/StudentLayout";

export default function Referral() {
  const [refs, setRefs] = useState([]);
  const [balance, setBalance] = useState(0);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    API.get("/referrals/my")
      .then((r) => setRefs(r.data.refs))
      .catch(() => {});

    API.get("/wallet/me")
      .then((r) => setBalance(r.data.balance))
      .catch(() => {});
  }, []);

  const shareLink =
    window.location.origin + "/register?ref=" + (user?.referralCode || "");

  const shareText = `🎉 Join Excella Digital!
Learn Full Stack Java + Premium Courses.

Use my referral link to sign up 👇  
${shareLink}

You join → I earn ₹600. Let's grow together 😄`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    alert("Referral link copied!");
  };

  // Social share handlers
  const shareButtons = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={22} />,
      color: "bg-green-500",
      link: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={22} />,
      color: "bg-pink-500",
      link: `https://www.instagram.com/?url=${encodeURIComponent(shareLink)}`,
    },
    {
      name: "Facebook",
      icon: <FaFacebook size={22} />,
      color: "bg-blue-600",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareLink
      )}`,
    },
    {
      name: "Twitter",
      icon: <FaTwitter size={22} />,
      color: "bg-sky-500",
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}`,
    },
    {
      name: "Telegram",
      icon: <FaTelegram size={22} />,
      color: "bg-blue-400",
      link: `https://t.me/share/url?url=${encodeURIComponent(
        shareLink
      )}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Email",
      icon: <FaEnvelope size={22} />,
      color: "bg-red-500",
      link: `mailto:?subject=Join Excella Digital&body=${encodeURIComponent(
        shareText
      )}`,
    },
  ];

  return (
        <StudentLayout>
    
    <div className="p-6 max-w-3xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-indigo-600" size={32} />
        <h1 className="text-3xl font-bold">Referral Program</h1>
      </div>

      {/* REFERRAL LINK CARD */}
      <div className="bg-white shadow-lg border rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <Link2 size={20} className="text-indigo-600" /> Your Referral Link
        </h3>

        <div className="flex gap-2">
          <input
            value={shareLink}
            readOnly
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none bg-gray-50"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-1 hover:bg-indigo-700"
          >
            <Copy size={18} /> Copy
          </button>
        </div>

        {/* SHARE BUTTONS GRID */}
        <h3 className="mt-4 mb-2 font-semibold text-gray-700">
          Share on Social Media:
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {shareButtons.map((btn) => (
            <a
              key={btn.name}
              href={btn.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn.color} text-white flex items-center justify-center gap-2 py-2 rounded-lg hover:opacity-90 transition`}
            >
              {btn.icon}
              {btn.name}
            </a>
          ))}
        </div>

        <p className="text-sm text-gray-600 mt-3">
          Share this link with friends. You earn <b>₹600</b> when they pay.
        </p>
      </div>

      {/* WALLET BALANCE */}
      <div className="bg-white shadow-lg border rounded-xl p-5 mb-6 flex items-center gap-4">
        <Wallet className="text-green-600" size={32} />
        <div>
          <h3 className="text-lg font-semibold">Your Wallet Balance</h3>
          <p className="text-2xl font-bold text-green-700">₹{balance}</p>
        </div>
      </div>

      {/* REFERRAL LIST */}
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
        <Gift size={22} className="text-indigo-600" /> Your Referrals
      </h2>

      {refs.length === 0 ? (
        <p className="text-gray-500">No referrals yet. Start sharing your link!</p>
      ) : (
        <div className="space-y-3">
          {refs.map((r) => (
            <div
              key={r._id}
              className="bg-white shadow border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{r.referredUserId.name}</div>
                <div className="text-sm text-gray-600">
                  {r.referredUserId.email}
                </div>
              </div>

              <div className="text-right">
                <span className="text-purple-600 font-bold">
                  +₹{r.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </StudentLayout>
  );
}
