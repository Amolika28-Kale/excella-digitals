import React from "react";
import { Share2, Copy, MessageCircle, Send, Facebook } from "lucide-react";

export default function ReferralShare() {
  const user = JSON.parse(localStorage.getItem("user"));
  const link = window.location.origin + "/register?ref=" + (user?.referralCode || "");

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    alert("Referral link copied!");
  };

  const shareText = encodeURIComponent(
    `🔥 Learn Digital Skills & Earn!\nJoin now: ${link}`
  );

  return (
    <div className="max-w-lg mx-auto p-6">

      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <Share2 className="text-indigo-600" /> Share & Earn
      </h1>

      {/* LINK CARD */}
      <div className="bg-white shadow-lg border rounded-xl p-5 mb-6">
        <p className="font-semibold text-lg mb-2">Your Referral Link</p>

        <div className="flex gap-2">
          <input
            value={link}
            readOnly
            className="w-full px-3 py-2 rounded-lg border bg-gray-50"
          />

          <button
            onClick={copyLink}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center"
          >
            <Copy size={18} />
          </button>
        </div>
      </div>

      {/* SOCIAL SHARE BUTTONS */}
      <div className="space-y-4">

        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          className="w-full flex items-center gap-3 bg-green-500 text-white p-3 rounded-lg"
        >
          <MessageCircle /> Share on WhatsApp
        </a>

        <a
          href={`https://t.me/share/url?url=${link}&text=${shareText}`}
          target="_blank"
          className="w-full flex items-center gap-3 bg-blue-500 text-white p-3 rounded-lg"
        >
          <Send /> Share on Telegram
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
          target="_blank"
          className="w-full flex items-center gap-3 bg-blue-700 text-white p-3 rounded-lg"
        >
          <Facebook /> Share on Facebook
        </a>

      </div>
    </div>
  );
}
