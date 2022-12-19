const puppeteer = require("puppeteer");
const express = require('express')
const ejs = require('ejs')
const app = express()

let PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static("public")) //Serv img/css  files

app.get('/', (request, response) => {
  
  getGold(response);  
  // response.send("OK")
})

async function getGold(response){
  const URL = "https://www.goldtraders.or.th/default.aspx";
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--use-gl=egl", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(URL);
  //Assign Value
  barSell = await page.waitForSelector("#DetailPlace_uc_goldprices1_lblBLSell");
  barSellPrice = await page.evaluate((barSell) => barSell.textContent, barSell);
  console.log(barSellPrice)
   await browser.close();
  // barBuy = await page.waitForSelector("#DetailPlace_uc_goldprices1_lblBLBuy");
  // barBuyPrice = await page.evaluate((barBuy) => barBuy.textContent, barBuy);
  // jewSell = await page.waitForSelector("#DetailPlace_uc_goldprices1_lblOMSell");
  // jewSellPrice = await page.evaluate((jewSell) => jewSell.textContent, jewSell);
  // jewBuy = await page.waitForSelector("#DetailPlace_uc_goldprices1_lblOMBuy");
  // jewBuyPrice = await page.evaluate((jewBuy) => jewBuy.textContent, jewBuy);
   let today = new Date()
   let thMonth = ['มกราคม', 'กุมภาพันธ์','มีนาคม', 'เมษายน', 'พฤษภาคม','มิถุนายน', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม','พฤศจิกายน', 'ธันวาคม']
  //    response.render("index", {
  //      barSell: barSellPrice,
  //      barBuy: barBuyPrice,
  //      jewBuy: jewBuyPrice,
  //      jewSell: jewSellPrice,
  //      date: today.getDate() + " " + thMonth[today.getMonth()] + " " + parseInt(today.getFullYear() + 543),
  //    });
     response.render("index", {
       barSell: 1,
       barBuy: 2,
       jewBuy: 3,
       jewSell: 4,
       date: today.getDate() + " " + thMonth[today.getMonth()] + " " + parseInt(today.getFullYear() + 543),
     });
}

// app.listen(PORT);
// console.log('Server started on port 80')

app.listen(PORT, () => {
  console.log("Start on port" + PORT)
})