import express, { application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connection } from "./db";
import { Web3Storage } from "web3.storage";
import { File } from "web3.storage";
import { UserData } from "./model/database";
import dotenv from "dotenv";
dotenv.config();
connection();
import axios from "axios";
const app = express();
//const axios = require("axios");
// middlewares
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ strict: false }));
app.use(cors());

app.use("/api/pricehistory", async (req, res) => {
  /* Example in Node.js */

  try {
    const response = await axios.get(
      "https://api.coinranking.com/v2/coin/uW2tk-ILY0ii/history?timePeriod=7d"
    );
    console.log(response.data);
    res.json(response.data);
  } catch (ex) {
    // error
    res.json(ex);
  }
});
app.use("/api/price", async (req, res) => {
  /* Example in Node.js */

  try {
    const response = await axios.get(
      "https://api.coinranking.com/v2/coin/uW2tk-ILY0ii/price"
    );
    console.log(response.data.data);
    res.json(response.data.data);
  } catch (ex) {
    res.json(ex);
  }
});

//////////////////////// ipfs/////////////////////////////////////////////

app.use("/api/ipfs", async (req, res) => {
  /* Example in Node.js */
  try {
    const client = new Web3Storage({
      token: process.env.key,
    });

    const buffer = Buffer.from(JSON.stringify(req.body));

    const files = [new File([buffer], "ok")];

    const cid = await client.put(files);

    const url = "https://" + cid + ".ipfs.w3s.link/ok";
    console.log(url);

    const Address = JSON.stringify(req.body.address);
    const dataofuser = new UserData({
      WalletAddress: Address,
      cid: cid,
      url: url,
    });
    await dataofuser.save();
    console.log("datasave hogya h ");

    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.use("/api/getcid", async (req, res) => {
  try {
    const address = JSON.stringify(req.body.address);
    const Check = await UserData.find({
      Address: { $eq: address },
    });
    console.log(JSON.stringify(Check));
    res.json(Check);
  } catch (e) {
    console.log(e);
  }
});
const port = 8081;
app.listen(port, console.log(`Listening on port ${port}...`));
