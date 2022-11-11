const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const axios = require("axios");
// middlewares
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.use("/api/pricehistory", async (req, res) => {
  /* Example in Node.js */

  try {
    response = await axios.get(
      "https://api.coinranking.com/v2/coin/uW2tk-ILY0ii/history?timePeriod=7d"
    );
  } catch (ex) {
    response = null;
    // error
    res.json(ex);
  }
  if (response) {
    // success

    const json = response.data;

    res.json(json);
  }
});
app.use("/api/price", async (req, res) => {
  /* Example in Node.js */

  try {
    response = await axios.get(
      "https://api.coinranking.com/v2/coin/uW2tk-ILY0ii/price"
    );
  } catch (ex) {
    response = null;
    // error
    res.json(ex);
  }
  if (response) {
    // success

    const json = response.data;

    res.json(json);
  }
});
const port = 8081;
app.listen(port, console.log(`Listening on port ${port}...`));
