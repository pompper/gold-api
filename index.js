const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path")

let chrome = {};
let puppeteer;

app.set("view engine", "ejs");
// app.use(express.static("public")) //Serv img/css  files
app.use(express.static("public")); //Serv img/css  files

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

app.get("/", async (req, res) => {
  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  try {
    // let browser = await puppeteer.launch(options);
    // let page = await browser.newPage();
    // await page.goto("https://ทองคําราคา.com");

    // const URL = "https://www.goldtraders.or.th/default.aspx";

    //Assign Value
    // barSell = await page.waitForSelector("#rightCol .trline:nth-child(2) .em:nth-child(3)");
    // barSellPrice = await page.evaluate((barSell) => barSell.textContent, barSell);
    // barBuy = await page.waitForSelector("#rightCol .trline:nth-child(2) .em");
    // barBuyPrice = await page.evaluate((barBuy) => barBuy.textContent, barBuy);
    // jewBuy = await page.waitForSelector("#rightCol .trline:nth-child(3) .em");
    // jewBuyPrice = await page.evaluate((jewBuy) => jewBuy.textContent, jewBuy);
    // jewSell = await page.waitForSelector("#rightCol .trline:nth-child(3) .em:nth-child(3)");
    // jewSellPrice = await page.evaluate((jewSell) => jewSell.textContent, jewSell);

    // console.log(barSellPrice)
    // res.send(barSellPrice);

    // res.send(await page.title());
    // red.send(await page.evaluate((barSell) => barSell.textContent, barSell))
    let today = new Date();
    let thMonth = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฏาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    // res.send(await jewSellPrice);
    // res.sendFile("index.html", { root: path.join(__dirname, "public") });
    // console.log(res)
    res.render('about')
    // res.setHeader("Content-Type", "text/html");
    // res.render("index", {
    //   //   barSell: barSellPrice,
    //   //   barBuy: barBuyPrice,
    //   //   jewBuy: jewBuyPrice,
    //   //   jewSell: jewSellPrice,
    //   barSell: 1,
    //   barBuy: 2,
    //   jewBuy: 3,
    //   jewSell: 4,
    //   date:
    //     today.getDate() +
    //     " " +
    //     thMonth[today.getMonth()] +
    //     " " +
    //     parseInt(today.getFullYear() + 543),
    // });
    res.end()
  } catch (err) {
    console.error(err);
    return null;
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});

module.exports = app;
