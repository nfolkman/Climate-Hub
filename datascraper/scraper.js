const puppeteer = require('puppeteer')
const URL = 'https://www.dailyclimate.org/impacts/'



async function scraper(){



   const browser = await puppeteer.launch()
   const page = await browser.newPage()
   await page.goto(URL, {waitUntil: 'domcontentloaded'})


   /*** code to take screenshot ***/
   // await page.screenshot({path: 'dailyclimate.png',fullPage: true})


   // declare variables
   let dataObj = {}
   var list


   // Run JS inside the page
   const data = await page.evaluate(()=> {
      list = []

      // target scrape content
      let items = Array.from(document.querySelectorAll('article.page-article'))
      let title = Array.from(document.querySelectorAll('.widget__headline-text')).map(x => x.textContent.trim())
      let summary = Array.from(document.querySelectorAll('.body-description p')).map(x => x.textContent.trim())
      let source = Array.from(document.querySelectorAll('.source-link')).map(x => x.textContent.trim())
      let date = Array.from(document.querySelectorAll('.social-date__text')).map(x => x.textContent.trim())


      // iterate through content and push to array
      for(let i = 0; i<items.length; i++){
         list.push( {
            title: title[i],
            summary: summary[i],
            source: source[i],
            date: date[i],
         })
      }
      return list
   })

   dataObj = data
   console.log(data)

   await browser.close()

   return data
}

module.exports = scraper