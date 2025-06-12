import React, { useState } from "react";

export function ChannelSense() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleQuery() {
    if (!query.trim()) {
      setError("Будь ласка, введіть текст запиту.");
      setResponse(null);
      return;
    }

    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch("http://localhost:3001/api/channel-sense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || "Сталася помилка на сервері.");
        return;
      }

      const data = await res.json();

      // Витягуємо текст відповіді з data.result.parts[0].text
      const answer = data?.result?.parts?.[0]?.text?.trim() || "Немає відповіді.";

      setResponse(answer);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Помилка при зверненні до сервера.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      maxWidth: 600,
      margin: "30px auto",
      padding: 20,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f9f9f9",
      borderRadius: 10,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}>
      <h1 style={{ color: "#3f51b5", textAlign: "center", marginBottom: 20 }}>
        ChannelSense <span role="img" aria-label="brain">🧠</span>
      </h1>

      <label htmlFor="query" style={{ fontWeight: "bold", display: "block", marginBottom: 8 }}>
        Введіть ваш запит:
      </label>
      <textarea
        id="query"
        placeholder="Наприклад, 'Як справи?'"
        rows={4}
        style={{
          width: "100%",
          padding: 12,
          fontSize: 16,
          borderRadius: 6,
          border: "1px solid #ccc",
          resize: "vertical",
          boxSizing: "border-box",
        }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
      />

      <button
        onClick={handleQuery}
        disabled={loading}
        style={{
          marginTop: 16,
          padding: "12px 20px",
          backgroundColor: loading ? "#a3a3a3" : "#3f51b5",
          color: "white",
          fontWeight: "bold",
          border: "none",
          borderRadius: 6,
          cursor: loading ? "not-allowed" : "pointer",
          width: "100%",
          fontSize: 16,
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#303f9f")}
        onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = "#3f51b5")}
      >
        {loading ? "Завантаження..." : "Виконати запит"}
      </button>

      {error && (
        <div style={{ marginTop: 20, color: "#d32f2f", fontWeight: "bold" }}>
          {error}
        </div>
      )}

      {response && (
        <div style={{
          marginTop: 20,
          backgroundColor: "#e8eaf6",
          borderRadius: 8,
          padding: 16,
          whiteSpace: "pre-wrap",
          fontSize: 16,
          lineHeight: 1.5,
          color: "#1a237e",
          boxShadow: "inset 0 0 5px rgba(63,81,181,0.3)"
        }}>
          {response}
        </div>
      )}
    </div>
  );
}
