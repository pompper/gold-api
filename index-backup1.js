const http = require('http')
const fetch = require('node-fetch')
const puppeteer = require("puppeteer");
const express = require('express')
const ejs = require('ejs');
const { CLIENT_RENEG_LIMIT } = require('tls');
const app = express()

app.set('view engine', 'ejs')
app.use(express.static("public")) //Serv img  files

app.addListener('connection', (socket) => console.log("Client Connect"))
app.get('/', (request, response) => {
  

  getGold(response);
    // fetch("https://www.thaigold.info/RealTimeDataV2/gtdata_.txt")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     response.render("index", {
    //       // jew: a,
    //       bar: data[4],
    //     });
    //   });


  // getGold()
  
  
})

async function getGold(response){
    const URL = "https://www.goldtraders.or.th/default.aspx";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    barSell = await page.waitForSelector("#DetailPlace_uc_goldprices1_lblBLSell");
    barSellPrice = await page.evaluate((barSell) => barSell.textContent, barSell);
    barBuy = await page.waitForSelector("#DetailPlace_uc_goldprices1_lblBLBuy");
    barBuyPrice = await page.evaluate((barBuy) => barBuy.textContent, barBuy);
    jewSell = await page.waitForSelector("#DetailPlace_uc_goldprices1_lblOMSell");
    jewSellPrice = await page.evaluate((jewSell) => jewSell.textContent, jewSell);
    jewBuy = await page.waitForSelector("#DetailPlace_uc_goldprices1_lblOMBuy");
    jewBuyPrice = await page.evaluate((jewBuy) => jewBuy.textContent, jewBuy);
    // console.log(heroDetail);
     let today = new Date()
     let thMonth = ['มกราคม', 'กุมภาพันธ์','มีนาคม', 'เมษายน', 'พฤษภาคม','มิถุนายน', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม','พฤศจิกายน', 'ธันวาคม']
       response.render("index", {
         barSell: barSellPrice,
         barBuy: barBuyPrice,
         jewBuy: jewBuyPrice,
         jewSell: jewSellPrice,
         date: today.getDate() + " " + thMonth[today.getMonth()] + " " + parseInt(today.getFullYear() + 543),
       });
    
    // await getApi()
    // return heroDetail

  
}


async function getApi(){
  fetch("https://www.thaigold.info/RealTimeDataV2/gtdata_.txt")
      .then((res) => res.json())
      .then((data) => {
        response.render("index", {
            jew: response,
            bar: data[4],
        });
      })
}
app.listen(3000)
console.log('Server started on port 3000')