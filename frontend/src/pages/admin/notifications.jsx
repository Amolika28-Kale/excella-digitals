import React, { useEffect, useState } from "react";
import API from "../../api";

export default function AdminNotifications() {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    API.get("/admin/users")
      .then((res) => {
        setUsers(res.data.users || []);  // <= FIXED HERE
      })
      .catch(() => setUsers([]));
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const sendNotification = async () => {
    await API.post("/notifications/send", {
      title,
      message,
      userIds: selected,
    });

    alert("Notification sent!");
    setTitle("");
    setMessage("");
    setSelected([]);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📢 Send Notification</h1>

      <div className="bg-white shadow p-6 rounded-xl max-w-xl">
        <label className="font-semibold">Title</label>
        <input
          className="border rounded px-3 py-2 w-full mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="font-semibold">Message</label>
        <textarea
          className="border rounded px-3 py-2 w-full mb-4"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <h2 className="font-semibold mt-4 mb-2">Select Users</h2>

        <div className="max-h-40 overflow-y-auto border p-3 rounded mb-4">
          {users.length === 0 ? (
            <p className="text-gray-500 text-sm">No users found</p>
          ) : (
            users.map((u) => (
              <label key={u._id} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selected.includes(u._id)}
                  onChange={() => toggleSelect(u._id)}
                />
                {u.name} ({u.email})
              </label>
            ))
          )}
        </div>

        <button
          onClick={sendNotification}
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700"
        >
          Send Notification
        </button>
      </div>
    </div>
  );
}
