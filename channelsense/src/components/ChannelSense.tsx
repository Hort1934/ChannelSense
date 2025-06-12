import React, { useState } from "react";

export function ChannelSense() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleQuery() {
  try {
    const res = await fetch("http://localhost:3001/api/channel-sense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    if (data && data.result) {
      setResponse(data.result);
    } else {
      setResponse("Немає відповіді на це запитання.");
    }
  } catch (err) {
    console.error(err);
    setResponse("Помилка при запиті до сервера.");
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
      <button onClick={handleQuery} style={{ marginTop: 10 }} disabled={loading}>
        {loading ? "Завантаження..." : "Виконати запит"}
      </button>
      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{response}</pre>
    </div>
  );
}
