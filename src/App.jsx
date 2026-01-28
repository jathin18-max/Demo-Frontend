import { useState } from "react";

export default function FlipkartSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const RAPIDAPI_KEY = "d9c722fc54mshb7d9d49d548cf68p17f0e9jsn3fdf0d245cc4"; // ⚠️ regenerate your key

  const searchProducts = async () => {
    console.log("Button clicked, query =", query);

    const res = await fetch(
      `https://flipkart-apis.p.rapidapi.com/backend/rapidapi/category-products-list?categoryID=axc&page=1`,
      {
        headers: {
          "X-RapidAPI-Host": "flipkart-apis.p.rapidapi.com",
          "X-RapidAPI-Key": RAPIDAPI_KEY,
        },
      }
    );

    const data = await res.json();
    console.log("API RESPONSE:", data);

    // ✅ Correct path
    setResults(data?.data?.products || []);
  };

  return (
    <div>
      <h2>Flipkart Category Products</h2>

      <input
        placeholder="Search (not used in this API)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchProducts}>Load Products</button>

      <div>
        {results.map((p, i) => (
          <div key={i} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
            <img src={p.url} width="100" alt="" />
            <p>Price: ₹{p.mrp}</p>
            <a href={p.url} target="_blank" rel="noreferrer">
              View on Flipkart
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
