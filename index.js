const app = require("express")();
const express = require("express");
// const ejs = require("ejs");

let chrome = {};
let puppeteer;

// app.set('view engine', 'ejs')
app.use(express.static("public")) //Serv img/css  files
// app.use(express.static("public")); //Serv img/css  files

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
    let browser = await puppeteer.launch(options);

    let page = await browser.newPage();
    await page.goto("https://ทองคําราคา.com");
    // const URL = "https://www.goldtraders.or.th/default.aspx";

    //Assign Value
    // barSell = await page.waitForSelector("#rightCol .trline:nth-child(2) .em:nth-child(3)");
    // barSellPrice = await page.evaluate((barSell) => barSell.textContent, barSell);
    // barBuy = await page.waitForSelector("#rightCol .trline:nth-child(2) .em");
    // barBuyPrice = await page.evaluate((barBuy) => barBuy.textContent, barBuy);
    // jewBuy = await page.waitForSelector("#rightCol .trline:nth-child(3) .em");
    // jewBuyPrice = await page.evaluate((jewBuy) => jewBuy.textContent, jewBuy);
    jewSell = await page.waitForSelector("#rightCol .trline:nth-child(3) .em:nth-child(3)");
    jewSellPrice = await page.evaluate((jewSell) => jewSell.textContent, jewSell);
    // console.log(barSellPrice)
    // res.send(barSellPrice);

    // res.send(await page.title());
    // red.send(await page.evaluate((barSell) => barSell.textContent, barSell))
    let today = new Date()
   let thMonth = ['มกราคม', 'กุมภาพันธ์','มีนาคม', 'เมษายน', 'พฤษภาคม','มิถุนายน', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม','พฤศจิกายน', 'ธันวาคม']
// res.setHeader("Content-Type","text/html")
    // res.send("<h1>"+jewSellPrice+"</h1>");
    res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gold API by 7/7 House</title>
    <!-- Canvas -->
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <!-- CSS -->
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <main>
        <div id="capture">
            <span id="date">${date}</span>
            <span id="custom" contenteditable="true">25,300</span>
            <span><%= barSell %></span><br>
            <span id="barbuy"><%= barBuy %></span><br>
            <span id="jewsell">${jewSellPrice}</span> <br>
            <span id="jewbuy"><%= jewBuy %> </span><br>
        </div>
        <p>กด Save แล้ว คลิกขวาที่ รูปภาพ แล้วเซฟอีกครั้ง</p>
        <button onclick="capture()">Save</button>
    </main>
    <section></section>
<script>
    function capture(){
        html2canvas(document.querySelector("#capture")).then(canvas => {
            document.getElementsByTagName('body')[0].appendChild(canvas)
            document.getElementsByTagName('main')[0].remove()
        });
    }
</script>
</body>
</html>
    `);
    // res.render("index", {
    // //   barSell: barSellPrice,
    // //   barBuy: barBuyPrice,
    // //   jewBuy: jewBuyPrice,
    // //   jewSell: jewSellPrice,
    //     barSell: 1,
    //   barBuy: 2,
    //   jewBuy: 3,
    //   jewSell: 4,
    //   date:today.getDate() + " " + thMonth[today.getMonth()] + " " + parseInt(today.getFullYear() + 543),
    // });
  } catch (err) {
    console.error(err);
    return null;
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});

module.exports = app;
