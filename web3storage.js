import axios from "axios";
// const Web3Storage = require("web3.storage");

function makeStorageClient() {
  return new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhMjc3ODVENGRCM0MyNGM2ZmM4NDQxMzI2ZjdEODc1MzE1ZGE4MTEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjgwODU5OTI3NDMsIm5hbWUiOiJMaXF1aVN3YXAifQ.kTJ6M7gfQrFkaA_gAn6OlsMl3scv7SlSy7GoA1S4dVY",
  });
}

function makeFileObjects() {
  const obj = { hello: "liquiswap" }; // contract address   wallet address  token name , token amount, time  , methods  ;
  const buffer = Buffer.from(JSON.stringify(obj));

  const files = [new File([buffer], "hello.json")];
  return files;
}

const files = makeFileObjects();
// for upload

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);

  ////////////////////////////////////////////////////////////////

  const url = "https://" + cid + ".ipfs.w3s.link/hello.json";
  console.log(url);

  const response = await axios.get(url);

  console.log(response);
}

storeFiles(files);
