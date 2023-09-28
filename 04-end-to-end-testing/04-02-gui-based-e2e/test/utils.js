const chalk = require('chalk')

const standardResolutions = [
  {
    screen: '19-inch-screen',
    width: 1280,
    height: 1024,
  },
  {
    screen: '20-inch-screen',
    width: 1600,
    height: 1200,
  },
  {
    screen: '22-inch-screen',
    width: 1680,
    height: 1050,
  },
  {
    screen: '24-inch-screen',
    width: 1900,
    height: 1200,
  },
];

const takeScreenshot = async (page, width, height, name) => {
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: 1,
  });
  await page.screenshot({path: `snapshots/${name}-${width}x${height}.png`});
  console.log(chalk.yellow('snapshot taken:', `snapshots/${name}-${width}x${height}.png`))
}

const takeAllStandardScreenshots = async (page, name) => {
  for (const { screen, width, height } of standardResolutions){
    await takeScreenshot(page, width, height, `${name}-${screen}`)
  }
}

module.exports = {
  takeScreenshot,
  takeAllStandardScreenshots,
}
