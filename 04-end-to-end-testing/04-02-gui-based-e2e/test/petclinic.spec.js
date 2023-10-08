const puppeteer = require('puppeteer')

const { takeAllStandardScreenshots } = require('./utils')
const { HomePage } = require('./page-objects')

let browser, page;

describe('PetClinic (with page objects)', function(){
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
    const homePage = new HomePage(page)

    const findOwnersPage = await homePage.navigateToFindOwners()

    const addOwnerPage = await findOwnersPage.navigateToAddOwner()

    await addOwnerPage.fillTheForm({
      firstName: 'John',
      lastName: 'Lennon',
      address: 'The Dakota',
      city: 'Liverpool',
      telephone: '123456789'
    })

    await takeAllStandardScreenshots(page, 'owner-form')

    const ownerPage = await addOwnerPage.submitTheForm()

    await ownerPage.expectTextToBeVisible("Owner Information")
    await ownerPage.expectTextToBeVisible("John Lennon")

    await takeAllStandardScreenshots(page, 'owner-page')
  })
})
