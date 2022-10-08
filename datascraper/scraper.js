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

      let image = Array.from(document.querySelectorAll('#col-center > div.widget__head > a > img')).map(x => x.src)

      let title = Array.from(document.querySelectorAll('.widget__headline-text')).map(x => x.textContent.trim())
      let summary = Array.from(document.querySelectorAll('.body-description')).map(x => x.textContent.trim())
      let source = Array.from(document.querySelectorAll('.widget__body.clearfix.sm-mt-1 > a')).map(x => x.textContent.trim())
      let link = Array.from(document.querySelectorAll('.widget__body.clearfix.sm-mt-1 > a')).map(x=> x.getAttribute('href'))
      let date = Array.from(document.querySelectorAll('.social-date__text')).map(x => x.textContent.trim())


      // iterate through content and push to array
      for(let i = 0; i<15; i++){
         list.push( {
            image: image[i],
            title: title[i],
            summary: summary[i],
            source: source[i],
            link: link[i],
            date: date[i],
         })
      }
      // return list.sort((a, b) => (a.date.length > b.date.length) ? 1 : -1)
      // return list.sort((a, b) => (a.date.includes('h')) ? -1 : 1)
      return list.sort((a,b)=>Date.parse(a.date)-Date.parse(b.date))
   })

   dataObj = data
   console.log(data)

   await browser.close()

   return data
}

module.exports = scraper