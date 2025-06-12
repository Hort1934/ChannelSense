import React, { useState } from "react";

type AIResponse = {
  result: {
    parts: { text: string }[];
    role: string;
  };
};

export function ChannelSense() {
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState<"analytics" | "management" | "report">("analytics");
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function callAI(query: string, type: string): Promise<AIResponse> {
    // Тестовий запит, заміни URL на свій AI сервер
    const res = await fetch("http://localhost:3001/api/channel-sense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, type }),
    });

    if (!res.ok) {
      throw new Error("Помилка сервера AI");
    }

    return await res.json();
  }

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
      const data = await callAI(query, queryType);
      const fullText = data.result.parts.map((p) => p.text.trim()).join("\n\n");
      setResponse(fullText || "Немає відповіді.");
    } catch (err) {
      console.error(err);
      setError("Помилка при зверненні до AI сервера.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      maxWidth: 600, margin: "30px auto", padding: 20,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f9f9f9", borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ color: "#3f51b5", textAlign: "center", marginBottom: 20 }}>
        ChannelSense <span role="img" aria-label="brain">🧠</span>
      </h1>

      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() => setQueryType("analytics")}
          disabled={loading}
          style={{
            marginRight: 8,
            backgroundColor: queryType === "analytics" ? "#3f51b5" : "#9fa8da",
            color: "white", padding: "8px 16px", border: "none", borderRadius: 6,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          Аналітика
        </button>
        <button
          onClick={() => setQueryType("management")}
          disabled={loading}
          style={{
            marginRight: 8,
            backgroundColor: queryType === "management" ? "#3f51b5" : "#9fa8da",
            color: "white", padding: "8px 16px", border: "none", borderRadius: 6,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          Управління
        </button>
        <button
          onClick={() => setQueryType("report")}
          disabled={loading}
          style={{
            backgroundColor: queryType === "report" ? "#3f51b5" : "#9fa8da",
            color: "white", padding: "8px 16px", border: "none", borderRadius: 6,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          Звіт
        </button>
      </div>

      <textarea
        placeholder="Введіть запит..."
        rows={4}
        style={{
          width: "100%", padding: 12, fontSize: 16, borderRadius: 6,
          border: "1px solid #ccc", resize: "vertical", boxSizing: "border-box"
        }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
      />

      <button
        onClick={handleQuery}
        disabled={loading}
        style={{
          marginTop: 16, padding: "12px 20px",
          backgroundColor: loading ? "#a3a3a3" : "#3f51b5",
          color: "white", fontWeight: "bold",
          border: "none", borderRadius: 6,
          cursor: loading ? "not-allowed" : "pointer",
          width: "100%", fontSize: 16,
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
          marginTop: 20, backgroundColor: "#e8eaf6", borderRadius: 8,
          padding: 16, whiteSpace: "pre-wrap", fontSize: 16,
          lineHeight: 1.5, color: "#1a237e",
          boxShadow: "inset 0 0 5px rgba(63,81,181,0.3)"
        }}>
          {response}
        </div>
      )}
    </div>
  );
}
