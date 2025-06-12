import React, { useState } from "react";

const sampleData = {
  founders: [
    { id: 1, text: "Looking for a cofounder with experience in marketing", author: "@user1" },
    { id: 2, text: "Partner wanted for blockchain startup", author: "@user2" },
    { id: 3, text: "Launching new product soon!", author: "@user3" },
  ],
  activity: {
    thisWeek: 70,
    lastWeek: 100,
  },
  newcomers: ["@newbie1", "@newbie2"],
  topPerformers: [
    { user: "@user1", likes: 50 },
    { user: "@user2", replies: 30 },
    { user: "@user3", casts: 10 },
  ],
};

export function ChannelSense() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  function handleQuery() {
    const q = query.toLowerCase();
    if (q.includes("cofounder") && q.includes("/founders")) {
      const matches = sampleData.founders.filter(
        (c) => c.text.toLowerCase().includes("cofounder") || c.text.toLowerCase().includes("partner")
      );
      setResponse(
        `Засновники, які шукають cofounder-ів:\n${matches.map((m) => `${m.author}: ${m.text}`).join("\n")}`
      );
    } else if (q.includes("менш активним")) {
      const diff = sampleData.activity.thisWeek - sampleData.activity.lastWeek;
      setResponse(
        `Активність цього тижня на ${Math.round((diff / sampleData.activity.lastWeek) * 100)}% порівняно з минулим тижнем.`
      );
    } else if (q.includes("новачків")) {
      setResponse(`Новачки для привітання:\n${sampleData.newcomers.join(", ")}`);
    } else if (q.includes("топ-3 учасники")) {
      setResponse(`Топ-3 учасники:\n${sampleData.topPerformers.map((p) => `${p.user}`).join("\n")}`);
    } else {
      setResponse("Немає відповіді на це запитання.");
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1>ChannelSense 🧠</h1>
      <textarea
        placeholder="Введіть ваш запит..."
        rows={4}
        style={{ width: "100%" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleQuery} style={{ marginTop: 10 }}>
        Виконати запит
      </button>
      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{response}</pre>
    </div>
  );
}
