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

app.use("/api/event", (req, res) => {
  /* Example in Node.js */

  let response = null;
  new Promise(async (resolve, reject) => {
    try {
      response = await axios.get(
        "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
        {
          headers: {
            "X-CMC_PRO_API_KEY": ,
            // "X-CMC_PRO_API_KEY": process.env.PrivateKey,
          },
        }
      );
    } catch (ex) {
      response = null;
      // error
      console.log(ex);
      reject(ex);
      res.json(ex);
    }
    if (response) {
      // success
      const json = response.data;
      console.log(json);
      resolve(json);
      res.json(json);
    }
  });
});

const port = 8081;
app.listen(port, console.log(`Listening on port ${port}...`));
