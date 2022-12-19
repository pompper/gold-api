const puppeteer = require("puppeteer");
const fs = require("fs");

async function getVisual() {
  try {
    const URL = "https://www.goldtraders.or.th/";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    //Download Content
    await downloadContent(page);
    // await downloadImg(page, char);

    // await console.log(char + " file write success fully");
    await browser.close();
  } catch (error) {
    console.log(error);
  }
}



async function downloadContent(page) {


  hero = await page.waitForSelector("#DetailPlace_uc_goldprices1_lblOMBuy");
  heroDetail = await page.evaluate((hero) => hero.textContent, hero);
  console.log(heroDetail);


}

async function init() {
  console.log(1);
  await sleep(1000);
  console.log(2);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function run(){
    await getVisual()
}

run();
