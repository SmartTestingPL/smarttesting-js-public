const chai = require('chai');
chai.should()
const expect = chai.expect

class HomePage {
  constructor(page){
    this.page = page
  }

  async navigateToFindOwners(){
    await this.page.evaluate(() => {
      [...document.querySelectorAll('a')].find(element => element.textContent.includes('Find owners')).click();
    });

    await this.page.waitForNavigation()

    return new FindOwners(this.page)
  }
}

class FindOwners {
  constructor(page){
    this.page = page
  }

  async navigateToAddOwner(){
    await this.page.evaluate(() => {
      [...document.querySelectorAll('a')].find(element => element.textContent.includes('Add Owner')).click();
    })

    await this.page.waitForNavigation()

    return new AddOwner(this.page)
  }
}

class AddOwner {
  constructor(page){
    this.page = page
  }

  async fillTheForm(inputsData){
    for (const [key, value] of Object.entries(inputsData)){
      await this.page.click(`#${key}`)
      await this.page.keyboard.type(value)
    }
  }

  async submitTheForm(){
    await this.page.evaluate(() => {
      [...document.querySelectorAll('button')].find(element => element.textContent.includes('Add Owner')).click();
    })

    await this.page.waitForNavigation()

    return new OwnerPage(this.page)
  }
}

class OwnerPage {
  constructor(page){
    this.page = page
  }

  async expectTextToBeVisible(phrase){
    expect(await this.page.$eval(
      "body",
      (body, phrase) => body.innerText.includes(phrase),
      phrase
    )).to.be.true
  }
}

module.exports = {
  HomePage,
}
