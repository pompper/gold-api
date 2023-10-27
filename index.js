const app = require("express")();
var cors = require("cors");
const express = require("express");
// My Custom function
const today = require('./today')

// const ejs = require("ejs");

let chrome = {};
let puppeteer;

// Ejs Template
app.set('view engine', 'ejs')

//app.use(express.static("public")); //Serv img/css  files
app.use(express.static(__dirname + "/public/")) //Serv img/css  files
app.use(cors())


if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

app.get("/", async (req, res) => {
  let options = {}
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
    async function getValue(selector) {
      try {
        let browser = await puppeteer.launch(options);
        let page = await browser.newPage();      
        await page.goto("https://www.goldtraders.or.th/UpdatePriceList.aspx");
        let dom = await page.waitForSelector(selector, {timeout: 2000});  
        let value = await page.evaluate((dom) => dom.textContent, dom);
        await browser.close();
        return value;
      }catch(e){
         res.render("about", {});
      }
    }

    // Sort ASC tr:nth-child(3) // DESC tr:last-child
    // barBuy = getValue("#DetailPlace_MainGridView tr:last-child td:nth-child(3)");
    // barSell = getValue("#DetailPlace_MainGridView tr:last-child td:nth-child(4)");
    // jewBuy = getValue("#DetailPlace_MainGridView tr:last-child td:nth-child(5)");
    // jewSell = getValue("#DetailPlace_MainGridView tr:last-child td:nth-child(6)");
    // adjust = getValue("#DetailPlace_MainGridView tr:last-child td:nth-child(9)");

    //Sort DESC
    barBuy = getValue("#DetailPlace_MainGridView tr:nth-child(3) td:nth-child(3)");
    barSell = getValue("#DetailPlace_MainGridView tr:nth-child(3) td:nth-child(4)");
    jewBuy = getValue("#DetailPlace_MainGridView tr:nth-child(3) td:nth-child(5)");
    jewSell = getValue("#DetailPlace_MainGridView tr:nth-child(3) td:nth-child(6)");
    adjust = getValue("#DetailPlace_MainGridView tr:nth-child(3) td:nth-child(9)");
    // adjust = getValue("#DetailPlace_MainGridView tr:nth-child(3) td:nth-child(9)");

    Promise.all([barBuy, barSell, jewBuy, jewSell, adjust]).then(
      (values) => {
        // console.log(values[0]);
        // console.log(values[4])
        let str = values[4]
        let flag = str.includes("-");
        if(flag == true){
          text = "<span style='color:#E20303; position:relative'>ลง " + values[4].substring(1); + "</span>";
        }else{
          text = "<span style='color:#0f8000; position:relative'>ขึ้น " + values[4] + "</span>";
        }
        // Collect of all values
        res.render("index", {
          date: today,
          barBuy: values[0],
          barSell: values[1],
          jewBuy: values[2],
          jewSell: values[3],
          adjust: text,
        });
      }
    );    
  }catch(err){
    res.render("about", {});
    console.error(err)
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started at http://localhost:3000");
});