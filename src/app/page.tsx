"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });

    const data = await res.json();

    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
    }
  };

  return (
    <div>
      <h1>Link Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="ULR to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <p>
          Shortened URL: <a href={`https://${shortUrl}`}>https://{shortUrl}</a>
        </p>
      )}
    </div>
  );
}
