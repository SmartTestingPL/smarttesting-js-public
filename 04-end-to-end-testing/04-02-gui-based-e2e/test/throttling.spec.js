const puppeteer = require('puppeteer')

const networkConditions = {
  fast3G: {
    offline: false,
    downloadThroughput: 1.6 * 1024 * 1024 / 8 * .9,
    uploadThroughput: 750 * 1024 / 8 * .9,
    latency: 150 * 3.75,
  },
  slow3G: {
    offline: false,
    downloadThroughput: 500 * 1024 / 8 * .8,
    uploadThroughput: 500 * 1024 / 8 * .8,
    latency: 400 * 5,
  },
}

const { HomePage } = require('./page-objects')

let browser;

describe('PetClinic (throttling)', function(){
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

  const scenarios = [{
    name: 'CPU throttling: rate 2',
    setup: async (page) => {
      const client = await page.target().createCDPSession();
      await client.send('Emulation.setCPUThrottlingRate', { rate: 2 }); // rate:1 - no throttling
    }
  }, {
    name: 'CPU throttling: rate 6',
    setup: async (page) => {
      const client = await page.target().createCDPSession();
      await client.send('Emulation.setCPUThrottlingRate', { rate: 6 });
    }
  }, {
    name: 'Network throttling: Fast 3G',
    setup: async (page) => {
      const client = await page.target().createCDPSession();
      await client.send('Network.enable');
      // taken from: https://github.com/ChromeDevTools/devtools-frontend/blob/80c102878fd97a7a696572054007d40560dcdd21/front_end/sdk/NetworkManager.js#L252-L274
      // Simulated network throttling (Fast 3G)
      await client.send('Network.emulateNetworkConditions', networkConditions.fast3G);
      await client.send('Emulation.setCPUThrottlingRate', { rate: 2.5 });
    }
  }, {
    name: 'Network throttling: Slow 3G',
    setup: async (page) => {
      const client = await page.target().createCDPSession();
      await client.send('Network.enable');
      // taken from: https://github.com/ChromeDevTools/devtools-frontend/blob/80c102878fd97a7a696572054007d40560dcdd21/front_end/sdk/NetworkManager.js#L252-L274
      // Simulated network throttling (Fast 3G)
      await client.send('Network.emulateNetworkConditions', networkConditions.slow3G);
      await client.send('Emulation.setCPUThrottlingRate', { rate: 2.5 });
    }
  }]

  for (const { name, setup } of scenarios) {
    it(`should add owner and display it afterwards (${name})`, async () => {
      const page = await browser.newPage()
  
      await setup(page)
  
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' })
  
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
  
      const ownerPage = await addOwnerPage.submitTheForm()
  
      await ownerPage.expectTextToBeVisible("Owner Information")
      await ownerPage.expectTextToBeVisible("John Lennon")
  
      await page.close()
    })
  }
})
