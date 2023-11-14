const script = document.currentScript;
let tokenName = prompt(
  "Enter the name of the cryptocurrency token in lowercase (e.g. bitcoin):"
);

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
                <h1>CoinGecko Cryptocurrency Widget</h1>
                <h2>${data.name} Details:</h2>
                <img src="${data.image.small}" alt="">
                <p>Description: ${data.description.en}</p>
                <p>Market Cap: $${data.market_data.market_cap.usd}</p>
                <p>Current Price: $${data.market_data.current_price.usd}</p>
                <p>24h Trading Volume: $${data.market_data.total_volume.usd}</p>
                <div id="footer">
                    Data provided by <a href="https://www.coingecko.com/" target="_blank">CoinGecko</a>
                </div>
                `;

    // Append the widget to the body
    document.body.appendChild(widgetContainer);
  })
  .catch((error) => {
    console.error("Error fetching data from CoinGecko API:", error);
  });
