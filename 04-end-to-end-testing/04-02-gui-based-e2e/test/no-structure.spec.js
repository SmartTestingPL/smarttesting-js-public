const puppeteer = require('puppeteer')
const chai = require('chai');
chai.should()
const expect = chai.expect

let browser, page;

describe('PetClinic (no structure)', function(){
  this.timeout(60000)

  before(async () => {
    browser = await puppeteer.launch({
      headless: false,
      devtools: false,
    });
  })

  after(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    page = await browser.newPage()
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' })
  })

  afterEach(async () => {
    await page.close()
  })

  it('should add owner and display it afterwards', async () => {
    await page.evaluate(() => {
      [...document.querySelectorAll('a')].find(element => element.textContent.includes('Find owners')).click();
    });

    await page.waitForNavigation()

    await page.evaluate(() => {
      [...document.querySelectorAll('a')].find(element => element.textContent.includes('Add Owner')).click();
    })

    await page.waitForNavigation()

    const inputsData = {
      firstName: 'John',
      lastName: 'Lennon',
      address: 'The Dakota',
      city: 'Liverpool',
      telephone: '123456789'
    }

    for (const [key, value] of Object.entries(inputsData)){
      await page.click(`#${key}`)
      await page.keyboard.type(value)
    }

    await page.evaluate(() => {
      [...document.querySelectorAll('button')].find(element => element.textContent.includes('Add Owner')).click();
    })

    await page.waitForNavigation()

    expect(await page.$eval(
      "body",
      (body, phrase) => body.innerText.includes(phrase),
      "Owner Information"
    )).to.be.true

    expect(await page.$eval(
      "body",
      (body, phrase) => body.innerText.includes(phrase),
      "John Lennon"
    )).to.be.true
  })
})
