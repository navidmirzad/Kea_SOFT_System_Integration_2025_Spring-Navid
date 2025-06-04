import fs from "fs";

/* const response = await fetch("https://www.proshop.dk/baerbar");
const result = await response.text();
fs.writeFile("proshop.html", result, (err) => {
  if (err) throw err;
  console.log("File saved!");
}); */

import { load } from "cheerio";

const page = fs.readFileSync("proshop.html", "utf-8");

const $ = load(page);

$("#products [product]").each((index, element) => {
  const name = $(element).find(".site-product-link").text();
  const price = $(element).find(".site-currency-lg").text();

  console.log(name, price);
});
