const puppeteer = require("puppeteer");
const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.static("display"));
async function scrapeAmazonProducts(url, fileName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { timeout: 1000000 });

  // Wait for the product elements to load
  await page.waitForSelector("div.sg-col-4-of-24");

  // Scrape product data
  const products = await page.evaluate(() => {
    const productNodes = document.querySelectorAll("div.a-section");

    const productsData = [];
    let count = 0;

    productNodes.forEach((node) => {
      if (count < 100) {
        const titleNode = node.querySelector("h2 > a > span");
        // const priceNode = node.querySelector('div.a-row.a-size-base > div.a-row > a >span.a-price > span.a-offscreen');
        const priceNode = node.querySelector("div.a-row > a > span > span");
        const imgNode = node.querySelector("div.a-section > img");
        const pageNode = node.querySelector("h2 > a.a-link-normal");

        if (titleNode && priceNode && imgNode && pageNode) {
          const title = titleNode.textContent.trim();
          const price = priceNode.textContent.trim();
          const image = imgNode.getAttribute("src");
          const page = pageNode.getAttribute("href");
          const pageUrl = `https://www.amazon.com/${page}`;

          productsData.push({ title, price, image, pageUrl });
          count++;
        }
      }
    });

    return productsData;
  });

  // await browser.close();

  // Save data to a JSON file
  fs.writeFile(fileName, JSON.stringify(products, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log(`Data has been successfully written to ${fileName}`);
  });
}

// Define URLs and file names
const tasks = [
  {
    url: "https://www.amazon.com/Grocery-Shopping-Online/s?k=Grocery+Shopping+Online",
    fileName: "./display/products.json",
  },
  {
    url: "https://www.amazon.com/Grocery-Shopping-Online/s?k=Grocery+Shopping+Online&page=2&qid=1704379250&ref=sr_pg_1",
    fileName: "./display/products1.json",
  },
  {
    url: "https://www.amazon.com/s?k=Grocery+Shopping+Online&page=5&qid=1704381170&ref=sr_pg_4",
    fileName: "./display/products2.json",
  },
];

// Loop through tasks and scrape data
tasks.forEach((task) => {
  scrapeAmazonProducts(task.url, task.fileName);
});
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
app.listen(5000, () => {
  console.log(`server is running on 5000`);
});
