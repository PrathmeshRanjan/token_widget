const script = document.currentScript;
const tokenName = script.getAttribute("data-token");

if (!tokenName) {
  console.error(
    "Token name is required. Add the data-token attribute to the script tag."
  );
}

const apiUrl = `https://api.coingecko.com/api/v3/coins/${tokenName}`;

// Fetch token details from CoinGecko API
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const widgetContainer = document.createElement("div");
    widgetContainer.innerHTML = `
                <h2>${data.name} Details</h2>
                <p>Market Cap: $${data.market_data.market_cap.usd}</p>
                <p>Current Price: $${data.market_data.current_price.usd}</p>
                <p>24h Trading Volume: $${data.market_data.total_volume.usd}</p>
            `;

    // Append the widget to the body
    document.body.appendChild(widgetContainer);
  })
  .catch((error) => {
    console.error("Error fetching data from CoinGecko API:", error);
  });
